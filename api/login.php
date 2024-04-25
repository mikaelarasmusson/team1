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

    $name = $requestData["username"];
    $password = $requestData["password"];
    $user = findItemByKey("users", "username", $name);

    if ($user == false) {
        abort(404, "User Not Found");
    }

    if ($user["password"] != $password) {
        abort(400, "Bad Request (invalid password)");
    }

    // This token is used to authenticate future requests
    $token = ["token" => sha1("$name$password")];
    send(200, $token);
}
else
{
    abort(405, "Method Not Allowed");
}

?>