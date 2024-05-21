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

// Gör en get, kolla om userId finns, loopa igenom alla users för att kolla varje user
// Jämföra ids, om deras id finns i listan, skicka tillbaka ett objekt med en nyckel (logged in == true)
// Annars skicka med ett objekt med nyckel (logged in == false).

if ($requestMethod == "GET") // Get all users
{
    $users = getDatabase("USERS");
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

    $newUser = insertItemByType("USERS", $requestData);
    $username = $newUser["username"];
    send(201,  "Register was a success, welcome $username");
}
else
{
    abort(405, "Method Not Allowed");
}
?>