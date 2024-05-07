<?php

function send($status = 200, $data = [])
{
    header("Content-Type: application/json");
    http_response_code($status);
    echo json_encode($data);
    exit();
}

function abort($status = 400, $message = "")
{
    send($status, ["error" => $message]);
}

function getRequestData()
{
    if ($_SERVER["REQUEST_METHOD"] == "GET") {
        return $_GET;
    }

    if ($_SERVER["CONTENT_TYPE"] != "application/json") {
        abort(400, "Bad Request (invalid content type)");
    }

    $json = file_get_contents("php://input");
    return json_decode($json, true);
}

function getDatabase ($entity)
{
    if (file_exists("database/$entity.json") == false) {
        abort(500, "Internal Server Error (wrong entity)");
    }

    $databaseContents = file_get_contents("database/$entity.json");
    $databaseData = json_decode($databaseContents, true);

    return $databaseData;
}

function requestContainsAllKeys($data, $keys)
{
    foreach ($keys as $key) {
        if (isset($data[$key]) == false) {
            return false;
        }
    }

    return true;
}

function requestContainsSomeKey($data, $keys)
{
    foreach ($keys as $key) {
        if (isset($data[$key])) {
            return true;
        }
    }

    return false;
}

function findItemByKey($entity, $key, $value)
{
    $database = getDatabase($entity);

    foreach ($database as $item) {
        if (isset($item[$key]) && $item[$key] == $value) {
            return $item;
        }
    }

    return false;
}

function insertItemByType($type, $keys, $data)
{
    $database = getDatabase();
    
    if (isset($database[$type]) == false) {
        abort(500, "Internal Server Error (database type '$type' does not exist)");
    }

    $databaseByType = $database[$type];

    $newItem = [];

    foreach ($keys as $key) {
        if ($key == "token") {
            continue;
        }
        $newItem[$key] = $data[$key];
    }

    $id = 0;

    foreach ($databaseByType as $item) {
        if (isset($item["id"]) && $item["id"] > $id) {
            $id = $item["id"];
        }
    }

    $newItem["id"] = $id + 1;
    $databaseByType[] = $newItem;
    $database[$type] = $databaseByType;
    $json = json_encode($database, JSON_PRETTY_PRINT);
    file_put_contents("database.json", $json);
    return $newItem;
}

function updateItemByType($type, $updatedItem)
{
    $database = getDatabase();
    
    if (isset($database[$type]) == false) {
        abort(500, "Internal Server Error (database type '$type' does not exist)");
    }

    $databaseByType = $database[$type];

    foreach ($databaseByType as $index => $item) {
        if (isset($item["id"]) && $item["id"] == $updatedItem["id"]) {
            $databaseByType[$index] = $updatedItem;
        }
    }

    $database[$type] = $databaseByType;
    $json = json_encode($database, JSON_PRETTY_PRINT);
    file_put_contents("database.json", $json);
    return $updatedItem;
}

function deleteItemByType($type, $itemToDelete)
{
    $databaseByType = getDatabase($type);

    foreach ($databaseByType as $index => $item) {
        if (isset($item["id"]) && $item["id"] == $itemToDelete["id"]) {
            array_splice($databaseByType, $index, 1);
        }
    }

    $json = json_encode($databaseByType, JSON_PRETTY_PRINT);
    file_put_contents("database/$type.json", $json);
    return $itemToDelete;
}

function getUserFromToken($requestToken, $entity)
{
    $users = getDatabase($entity);
    $type = "USERS";

    foreach ($users as $user) {
        if (isset($user["id"])) {
            $userId = $user["id"];

            if ($requestToken == $userId) {
                return $user;
            }
        }
    }

    return false;
}

function removeUserGamesCharacters($userId)
{
    $database = getDatabase();

    if (isset($database["games"]) == false) {
        abort(500, "Internal Server Error (database type 'games' does not exist)");
    }

    if (isset($database["characters"]) == false) {
        abort(500, "Internal Server Error (database type 'characters' does not exist)");
    }

    $games = $database["games"];
    $characters = $database["characters"];

    foreach ($games as $gameIndex => $game) {
        // If the user created the game, remove it completely
        if ($game["user_id"] == $userId) {
            array_slice($games, $gameIndex, 1);
        }
    }

    foreach ($characters as $characterIndex => $character) {
        // If the user created the character, remove it completely
        if ($character["user_id"] == $userId) {
            array_slice($characters, $characterIndex, 1);
        }
    }
}

?>