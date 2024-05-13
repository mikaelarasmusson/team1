<?php

require_once("helpers.php");

if ($_SERVER["REQUEST_METHOD"] == "OPTIONS") {
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: *");
    header("Access-Control-Allow-Origin: *");
    exit();
} else {
    header("Access-Control-Allow-Origin: *");
}

$requestMethod = $_SERVER["REQUEST_METHOD"];
$requestData = getRequestData();

if ($requestMethod == "GET") // Get one or all flashcards
{
    $data = getDatabase("FLASHCARDS");

    send(200, $data);
    
    /*
    $user = getUserFromToken($requestData["token"]);
    $games = getDatabaseByType("games");
    foreach ($games as $index => &$flashcard) {
        if ($flashcard["user_id"] != $user["id"]) {
            array_splice($games, $index, 1);
        }
    }
    */
}
else if ($requestMethod == "POST") // Create a new flashcard
{
    if (empty($requestData)) {
        abort(400, "Bad Request (empty request)");
    }

    $flashcardKeys = ["USERS", "subject", "questions"];
    $questionKeys = ["FLASHCARDS", "questionId", "question", "answer"];

    if (requestContainsAllKeys($requestData, $flashcardKeys) == false) {
        abort(400, "Bad Request (missing flashcard keys)");
    }

    if (requestContainsAllKeys($requestData["questions"], $questionKeys) == false) {
        abort(400, "Bad Request (missing question keys)");
    }

    $user = findItemByKey("USERS", "username", $requestData["user"]);

    if ($user == false) {
        abort(400, "Bad Request (invalid user)");
    }

    $flashcard = findItemByKey("FLASHCARDS", "id", $requestData["id"]);

    if ($flashcard == false) {
        abort(400, "Bad Request (flashcard already exists)");
    }

    $requestData["USERS"] = $user["id"];
    $newFlashcard = insertItemByType("FLASHCARDS", $flashcardKeys, $requestData);

    $newQuestion = $requestData["questions"];
    $newQuestion["FLASHCARDS"] = $newFlashcard["id"];
    $newQuestion = insertItemByType("questions", $questionKeys, $newQuestion);

    send(201, ["FLASHCARDS" => $newFlashcard, "questions" => $newQuestion]);
} 
else if ($requestMethod == "PATCH") 
{
    if (empty($requestData)) {
        abort(400, "Bad Request (empty request)");
    }

    $likeKeys = ["id", "userId"];

    if (requestContainsAllKeys($requestData, $likeKeys) == false) {
        abort(400, "Bad Request (missing keys)");
    }

    $user = getUserFromToken($requestData["id"], "users");

    if ($user == false) {
        abort(400, "Bad Request (invalid token)");
    }
    
    $flashcardSingleCard = findItemByKey("FLASHCARDS", "id", "questionId"[0], $requestData["questionId"[0]]);

    if ($flashcardSingleCard == false) {
        abort(404, "Game Not Found");
    }
 
    $updatedGame = updateItemByType("FLASHCARDS", $flashcardSingleCard);
    send(200, $updatedGame);
}
else if ($requestMethod == "DELETE") // Delete a flashcard
{
    if (empty($requestData)) {
        abort(400, "Bad Request (empty request)");
    }

    $user = getUserFromToken($requestData["id"], "users");

    if ($user == false) {
        abort(400, "Bad Request (invalid user ID)");
    }

    $deleteKeys = ["id", "userId"];

    if (requestContainsAllKeys($requestData, $deleteKeys) == false) {
        abort(400, "Bad Request (missing keys)");
    }

    $flashcardDeck = findItemByKey("FLASHCARDS", "id", $requestData["id"]);

    if ($flashcardDeck == false) {
        abort(404, "Flashcard Not Found");
    }

    $deleteSingleCardKeys = ["id", "userId", "questionId"];

    if (requestContainsAllKeys($requestData, $deleteSingleCardKeys) == false) {
        abort(400, "Bad Request (missing keys)");
    }

    $flashcardSingleCard = findItemByKey("FLASHCARDS", "id", "questionId"[0], $requestData["questionId"[0]]);

    if ($flashcardSingleCard == false) {
        abort(404, "Card not found");
    }

    $deletedFlashcardDeck = deleteItemByType("FLASHCARDS", $flashcardDeck);
    send(200, $deletedFlashcardDeck);

    $deletedSingleFlashcard = deleteItemByType("FLASHCARDS", $flashcardSingleCard);
    send(200, $deletedSingleFlashcard);
} 
?>