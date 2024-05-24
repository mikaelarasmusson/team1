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

if ($requestMethod == "GET") // Get all users
{
    $users = getDatabase("users");
    send(200, $users);
}
else if ($requestMethod == "POST") // Register a new user
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

    $newUser = insertItemByType("users", $requestData);
    $username = $newUser["username"];
    send(201,  "Register was a success, welcome $username");
}
else
{
    abort(405, "Method Not Allowed");
}
?>