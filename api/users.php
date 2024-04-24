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

if ($requestMethod == "POST") // Register a new user
{
    if (empty($requestData)) {
        abort(400, "Bad Request (empty request)");
    }

    $userKeys = ["username", "password"];

    if (requestContainsAllKeys($requestData, $userKeys) == false) {
        abort(400, "Bad Request (missing keys)");
    }

    $name = $requestData["username"];
    $user = findItemByKey("users", "username", $name);
    
    if ($user != false) {
        abort(400, "Bad Request (user already exists)");
    }

    $newUser = insertItemByType("users", $userKeys, $requestData);
    unset($newUser["password"]);
    send(201, $newUser);
}
else if ($requestMethod == "DELETE") // Delete an user account (token required)
{
    if (empty($requestData)) {
        abort(400, "Bad Request (empty request)");
    }

    if (isset($requestData["token"]) == false) {
        abort(400, "Bad Request (missing token)");
    }
    
    $user = getUserFromToken($requestData["token"]);

    if ($user == false) {
        abort(400, "Bad Request (invalid token)");
    }

    // Clean up games/characters the user created and/or liked
    removeUserGamesCharacters($user["id"]);

    $deletedUser = deleteItemByType("users", $user);
    unset($newUser["password"]);
    send(200, $deletedUser);
}
else
{
    abort(405, "Method Not Allowed");
}
?>