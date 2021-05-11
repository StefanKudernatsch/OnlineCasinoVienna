<?php

include "../classes/simpleLogic.php";

$logic = new simpleLogic();
$server_method = $_SERVER['REQUEST_METHOD'];
$param = "";
$method = "";
$param2 = "";
$param3 = "";


if ($server_method === "POST") {
    $jsonObj = json_decode(file_get_contents('php://input'));
    if(isset($jsonObj->LogUser)){
        $method = "loginUser";
        $param = $jsonObj->LogUser;
        $param2 = $jsonObj->LogPW;
        $result = $logic->handleRequest($method, $param, $param2, $param3);
        response(['REQUEST_METHOD'], 200, $result);
    }
    else if(isset($jsonObj->User)){
        $param = new User($jsonObj->User[1], $jsonObj->User[2], $jsonObj->User[3],$jsonObj->User[4],$jsonObj->User[5],$jsonObj->User[6],$jsonObj->User[7], $jsonObj->User[8], $jsonObj->User[9], $jsonObj->User[10], $jsonObj->User[11], $jsonObj->User[12], $jsonObj->User[13], $jsonObj->User[14]);
        $param->setUserID($jsonObj->User[0]);
        $method = "updateUser";

        $result = $logic->handleRequest($method, $param, $param2, $param3);

        response($_SERVER['REQUEST_METHOD'], 200, $result);
    }
    else if (isset($jsonObj->money)) {
        $method = "addMoney";
        $param = $jsonObj->UserID;
        $param2 = $jsonObj->money;
        $param3 = $jsonObj->reason;
        $result = $logic->handleRequest($method, $param, $param2, $param3);
    
        response($_SERVER['REQUEST_METHOD'], 200, $result);
    }
    
}
else if($server_method === "GET"){
    $method = $_GET["method"];
    $param = $_GET["param"];
    $result = $logic->handleRequest($method, $param, $param2, $param3);
    
    response($_SERVER['REQUEST_METHOD'], 200, $result);
}



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