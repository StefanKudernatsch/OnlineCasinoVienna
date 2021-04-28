<?php
include("DB.php");

class simpleLogic {

    private $DB;

    /**
     * simpleLogic constructor.
     */
    public function __construct()
    {
        $this->DB = new DB();
    }

    //gets called with method and params
    //executes chosen db class functions (sql statements)
    function handleRequest($method, $param, $param2) {
        switch ($method) {
            case "getUserList":
            {
                $res = $this->DB->getUserList();
                break;
            }
            case "getUserWithName": {
                $res = $this->DB->getUserWithName($param);
                break;
            }
            case "getUserActiveWithName": {
                $res = $this->DB->getUserActiveWithName($param);
                break;
            }
            case "registerUser": {
                $res = $this->DB->registerUser($param);
                break;
            }
            case "updateUser": {
                $res = $this->DB->updateUser($param);
                break;
            }
            case "loginUser": {
                $res = $this->DB->loginUser($param, $param2);
                break;
            }
            case "getMoney": {
                $res = $this->DB->getMoney($param);
                break;
            }
            default: {
                $res = null;
                break;
            }
        }
        return $res;
    }
}