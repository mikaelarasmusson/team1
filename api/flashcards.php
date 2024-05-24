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

if ($requestMethod == "GET") // Get all flashcards
{
    $data = getDatabase("flashcards");
    $filteredFlashcards = array_filter_flashcards($data, $requestData["userId"]);

    send(200, $filteredFlashcards);
}
else if ($requestMethod == "POST") // Create a new flashcard
{
    if (empty($requestData)) {
        abort(400, "Bad Request (empty request)");
    }

    $flashcardKeys = ["userId", "subject", "questions"];
    
    if (requestContainsAllKeys($requestData, $flashcardKeys) == false) {
        abort(400, "Bad Request (missing flashcard keys)");
    }

    $user = findItemByKey("users", "id", $requestData["userId"]);

    if ($user == false) {
        abort(400, "Bad Request (invalid user)");
    }

    $flashcard = insertItemByType("flashcards", $requestData);

    send(200, $flashcard);
} 
else if ($requestMethod == "DELETE") // Delete a flashcardDeck
{
    if (empty($requestData)) {
        abort(400, "Bad Request (empty request)");
    }

    $user = getUserFromToken($requestData["userId"], "users");

    if ($user == false) {
        abort(400, "Bad Request (invalid user ID)");
    }

    $deleteKeys = ["id", "userId"];

    if (requestContainsAllKeys($requestData, $deleteKeys) == false) {
        abort(400, "Bad Request (missing keys)");
    }

    $flashcardDeck = findItemByKey("flashcards", "id", $requestData["id"]);

    if ($flashcardDeck == false) {
        abort(404, "Flashcard Not Found");
    }

    $deletedFlashcardDeck = deleteItemByType("flashcards", $flashcardDeck);
    send(200, $deletedFlashcardDeck);
} 
else
{
    abort(405, "Method Not Allowed");
}
?>