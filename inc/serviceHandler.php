<?php
include "../classes/simpleLogic.php";

$logic = new simpleLogic();
$server_method = $_SERVER['REQUEST_METHOD'];
$param = "";
$method = "";
$param2 = "";


if ($server_method === "POST") {
    $jsonObj = json_decode(file_get_contents('php://input'));
    if(isset($jsonObj->LogUser)){
        $method = "loginUser";
        $param = $jsonObj->LogUser;
        $param2 = $jsonObj->LogPW;
    }
}
else if($server_method === "GET"){
    $method = $_GET["method"];
    $param = $_GET["param"];

}


$result = $logic->handleRequest($method, $param, $param2);

if ($result == null) {
    response($_SERVER['REQUEST_METHOD'], 400, null);
} else {
    response($_SERVER['REQUEST_METHOD'], 200, $result);
}

//depending on method -> GET OR POST
// json encode or decode or if not one of those two -> error

function response($method, $httpStatus, $data)
{
    header('Content-Type: application/json');
    switch ($method) {
        case  "GET":
            http_response_code($httpStatus);
            echo(json_encode($data));
            break;
        case "POST":
            http_response_code($httpStatus);
            echo($data);
            break;
        default:
            http_response_code(405);
            echo "Method not supported yet";
    }
}


?>