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

    $inputKeys = ["username", "password"];

    if (requestContainsAllKeys($requestData, $inputKeys) == false) {
        abort(400, "Bad Request (missing keys)");
    }

    $user = findItemByKey("users", "username", $requestData["username"]);

    if ($user == false) {
        abort(400, "Bad Request (User doesn't exist!)");
    }

    $users = getDatabase("users");

    foreach ($users as &$user) {
        if (isset($user["username"]) && $user["username"] == $requestData["username"]) {
            $user["password"] = $requestData["password"];
        }
    }
    

    $json = json_encode($users, JSON_PRETTY_PRINT);
    file_put_contents("database/users.json", $json);
    send(200, "Password updated sucessfully!");
}
else
{
    abort(405, "Method Not Allowed");
}

?>