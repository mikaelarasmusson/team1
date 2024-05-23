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

if ($requestMethod == "POST") // Login (name + password)
{
    if (empty($requestData)) {
        abort(400, "Bad Request (empty request)");
    }

    $loginKeys = ["username", "password"];

    if (requestContainsAllKeys($requestData, $loginKeys) == false) {
        abort(400, "Bad Request (missing keys)");
    }

    $username = $requestData["username"];
    $password = $requestData["password"];
    $user = findItemByKey("users", "username", $username);

    if ($user == false) {
        abort(404, "User Not Found");
    }

    if ($user["password"] != $password) {
        abort(400, "Bad Request (invalid password)");
    }

    $userFlashcards = getUserFlashcards($user["id"]);

    $response = ["id" => $user["id"], "username" => $user["username"]];
    send(200, $response); // Skickar ett JSON-objekt med ID och användarnamn
}
else if ($requestMethod == "PATCH") 
{
    if (empty($requestData)) {
        abort(400, "Bad Request (empty request)");
    }

    $inputKeys = ["id", "username", "password"];

    if (requestContainsAllKeys($requestData, $inputKeys) == false) {
        abort(400, "Bad Request (missing keys)");
    }

    $user = getUserFromToken($requestData["id"], "users");

    if ($user == false) {
        abort(400, "Bad Request (invalid token)");
    }
    
    //if ($user["password]) Fixa denna så att det uppdaterar lösenordet.

    send(200, ["message" => "Password updated sucessfully!"]);
}
else
{
    abort(405, "Method Not Allowed");
}

?>