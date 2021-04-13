<?php

/* Adrian 5.4.21:
 * deleted functions: likes, comments, files
 * Untouched functions: users, pws, profilepictures, messages, friends
 */

class DB
{
    public $host;
    public $user;
    public $password;
    public $database;
    public $connect;


    function __construct()
    {

        /*
        $this->host = 'localhost';
        $this->user = 'onlinecasino_w3';
        $this->password = 'j9l9Qq2UeWkjxvI73KiTcZN21Xr9Kun3yK0ximFa';
        $this->database = 'online_casino_w3_cs_technikum_wien_at';
        */


        $this->host = 'localhost';
        $this->user = 'root';
        $this->password = '';
        $this->database = 'online-casino';


        $this->connect = new mysqli($this->host, $this->user, $this->password, $this->database);

        if ($this->connect->connect_error) {

            return 'error';
        }
    }


    function getUserList()
    {
        $users = array();
        $result = $this->connect->query("SELECT ID FROM user");
        while ($user = $result->fetch_assoc()) {
            if ($user["ID"] != 1) {
                $tempuser = $this->getUserWithID($user["ID"]);
                $tempuser->setUserID($user["ID"]);
                $users[] = $tempuser;
            }
        }
        return $users;
    }


    function getUserWithID($user_id)
    {
        $sql = "SELECT * FROM user WHERE ID = ?;";
        $stmt = $this->connect->prepare($sql);
        $stmt->bind_param('i', $user_id);
        $stmt->execute();
        $result = $stmt->get_result();
        $user = $result->fetch_assoc();
        $tempuser = new User($user["Gender"], $user["Birthday"], $user["FirstName"], $user["LastName"], $user["Address"], $user["PostalCode"], $user["City"], $user["UserName"], $user["Password"], $user["Email"], $user["Money"], $user["Active"], $user["Banned"]);
        $tempuser->setUserID($user["ID"]);
        return $tempuser;
    }


    function getUserWithName($user_username)
    {
        $sql = "SELECT * FROM user WHERE UserName = ?;";
        $stmt = $this->connect->prepare($sql);
        $stmt->bind_param('s', $user_username);
        $stmt->execute();
        $result = $stmt->get_result();
        $user = $result->fetch_assoc();
        $tempuser = new User($user["Gender"], $user["Birthday"], $user["FirstName"], $user["LastName"], $user["Address"], $user["PostalCode"], $user["City"], $user["UserName"], $user["Password"], $user["Email"], $user["Money"], $user["Active"], $user["Banned"]);
        $tempuser->setUserID($user["ID"]);
        return $tempuser;
    }


    function getUserActiveWithName($user_username) {
        $sql = "SELECT Active FROM user WHERE UserName = ?;";
        $stmt = $this->connect->prepare($sql);
        $stmt->bind_param('s', $user_username);
        $stmt->execute();
        $result = $stmt->get_result();
        $value = $result->fetch_assoc();
        return $value["Active"];
    }


    function getUserImage($user_id)
    {
        $stmt = $this->connect->prepare("SELECT UserImage FROM user WHERE ID=?");
        $stmt->bind_param("i", $user_id);
        $stmt->execute();
        $stmt->store_result();
        $stmt->bind_result($image);
        $stmt->fetch();
        return $image;
    }


    function getUserMail($user_email)
    {
        $sql = "SELECT * FROM user WHERE EMailAddress = ?;";
        $stmt = $this->connect->prepare($sql);
        $stmt->bind_param('s', $user_email);
        $stmt->execute();
        $result = $stmt->get_result();
        $user = $result->fetch_assoc();
        return new User($user["Gender"], $user["FirstName"], $user["LastName"], $user["UserImage"], $user["UserBirthDay"], $user["Username"], $user["Password"], $user["EMailAddress"], $user["City"], $user["PLZ"], $user["UserAddress"], $user["UserActive"]);
    }


    function uploadImage($user_image, $user_id) //
    {
        $sql = "UPDATE user SET UserImage=? WHERE ID = " . $user_id . ";";
        $stmt = $this->connect->prepare($sql);
        $null = "NULL";
        $stmt->bind_param("b", $null);
        $stmt->send_long_data(0, file_get_contents($user_image));
        return $stmt->execute();
    }


    function registerUser(User $user_object)
    {
        $sql = "INSERT INTO user (Gender, Birthday, FirstName, LastName, Address, PostalCode, City, UserName, Password, Email, Money, Active, Banned) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?);";
        $stmt = $this->connect->prepare($sql);
        $gender = $user_object->getUserGender();
        $birthday = $user_object->getUserBirthday();
        $firstname = $user_object->getUserFirstName();
        $lastname = $user_object->getUserLastName();
        $address = $user_object->getUserAddress();
        $plz = $user_object->getUserPLZ();
        $city = $user_object->getUserCity();
        $username = $user_object->getUserName();
        $password = password_hash($user_object->getUserPassword(), PASSWORD_DEFAULT);
        $email = $user_object->getUserEmail();
        $money = $user_object->getUserMoney();
        $active = $user_object->getUserActive();
        $banned = $user_object->getUserBanned();
        $stmt->bind_param("issssissssiii", $gender, $birthday, $firstname, $lastname, $address, $plz, $city, $username, $password, $email, $money, $active, $banned);
        return $stmt->execute();
    }


    function updateUser(User $user_object)
    {
        $sql = "UPDATE user SET Gender = ?, Birthday = ?, FirstName = ?, LastName = ?, Address = ?, PostalCode = ?, City = ?, UserName = ?, Password = ?, Email = ?, Money = ?, Active = ?, Banned = ? WHERE ID = ?;";
        $stmt = $this->connect->prepare($sql);

        $gender = $user_object->getUserGender();
        $firstname = $user_object->getUserFirstName();
        $lastname = $user_object->getUserLastName();
        $birthday = $user_object->getUserBirthday();
        $username = $user_object->getUserName();
        $email = $user_object->getUserEmail();
        $city = $user_object->getUserCity();
        $plz = $user_object->getUserPLZ();
        $address = $user_object->getUserAddress();
        $id = $user_object->getUserID();

        $stmt->bind_param("sssssisssi", $gender,$birthday, $firstname, $lastname, $address, $plz, $city, $username, $email, $id);

        $ergebnis = $stmt->execute();

        if ($_SESSION["UserName"] == "admin") {
            header("Location: ");
        } else {
            $_SESSION["UserName"] = $username;
        }

        return $ergebnis;
    }


    function changeUserActive($user_active, $user_id)
    {
        $sql = "UPDATE user SET Active = ? WHERE ID = ?;";
        $stmt = $this->connect->prepare($sql);
        $stmt->bind_param("ii", $user_active, $user_id);
        return $stmt->execute();
    }


    function resetPassword($user_email)
    { //
        $sql = "UPDATE user SET Password = ? WHERE Email = ?;";
        $stmt = $this->connect->prepare($sql);
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $randomString = '';

        for ($i = 0; $i < 10; $i++) {
            $index = rand(0, strlen($characters) - 1);
            $randomString .= $characters[$index];
        }
        mail($user_email, "New password", "$randomString");
        $password = password_hash($randomString, PASSWORD_DEFAULT);
        $stmt->bind_param("ss", $password, $user_email);
        return $stmt->execute();
    }


    function loginUser($username, $password)
    {
        $user = $this->getUserWithName($username);
        //var_dump($user);
        //var_dump($user->getUserPassword());
        //var_dump($password);
        if (password_verify($password, $user->getUserPassword())) {
            $_SESSION["UserName"] = $user->getUserName();
            return true;
        }
        else if($password == $user->getUserPassword()){
            $_SESSION["UserName"] = $user->getUserName();
            return true;
        }
        else {
            return false;
        }
    }


    function updateUserPW($user_id, $old_PW, $new_PW) //
    {
        if (password_verify($old_PW, $this->getUserWithID($user_id)->getUserPassword())) {

            $sql = "UPDATE user SET Password = ? WHERE ID = ?;";
            $stmt = $this->connect->prepare($sql);
            $password = password_hash($new_PW, PASSWORD_DEFAULT);
            $stmt->bind_param("si", $password, $user_id);
            if ($stmt->execute()) {
                return 0;
            } else {
                return 1;
            }
        } else {
            return 2;
        }
    }

    
    function getMoney($user_id)
    {
        $sql = "SELECT * FROM user WHERE ID = ?;";
        $stmt = $this->connect->prepare($sql);
        $stmt->bind_param('i', $user_id);
        $stmt->execute();
        $result = $stmt->get_result();
        $moneyarr = $result->fetch_assoc();
        $money = $moneyarr["Money"];
        return $money;
    }

    function addLog($user_id, $reason, $beforemoney, $aftermoney)
    {
        $sql = "INSERT INTO moneylog (LogID, LogReason, UserID, MoneyBefore, MoneyAfter, Date) VALUES
        (NULL, ?, ?, ?, ?, NULL)";
        $stmt = $this->connect->prepare($sql);
        $stmt->bind_param('iiii', $user_id, $reason, $beforemoney, $aftermoney);
        return $stmt->execute();
    }

    function getLogs($user_id)
    {
        $sql = "SELECT * FROM moneylog WHERE UserID = ?;";
        $stmt = $this->connect->prepare($sql);
        $stmt->bind_param('i', $user_id);
        $stmt->execute();
        $result = $stmt->get_result();
        $logarr = array();

        while ($row = $result->fetch_assoc()) {
                $logarr['LogID'] = $row->LogID;
                $logarr['LogReason'] = $row->LogReason;
                $logarr['UserID'] = $row->UserID;
                $logarr['MoneyBefore'] = $row->MoneyBefore;
                $logarr['MoneyAfter'] = $row->MoneyAfter;
                $logarr['Date'] = $row->Date;
            
        }
        return $logarr;
    }

    function addMoney($user_id, $amount, $reason)
    {
        $beforemoney = $this->getMoney($user_id);
        $aftermoney = $beforemoney + $amount;

        $sql = "UPDATE user SET Money=? WHERE UserID = ?;";
        $stmt = $this->connect->prepare($sql);
        $stmt->bind_param('ii', $user_id, $aftermoney);
        $stmt->execute();
        
        if($stmt == true)
        {
            $this->addlog($user_id, $reason, $beforemoney, $aftermoney);
        }
        else
        {
            return false;
        }
    
        
    }

    function rmMoney($user_id, $amount, $reason)
    {
        $beforemoney = $this->getMoney($user_id);
        $aftermoney = $beforemoney - $amount;

        if($aftermoney < 0)
        {
            return false;
        }

        $sql = "UPDATE user SET Money=? WHERE UserID = ?;";
        $stmt = $this->connect->prepare($sql);
        $stmt->bind_param('ii', $user_id, $aftermoney);
        $stmt->execute();
        
        if($stmt == true)
        {
            $this->addlog($user_id, $reason, $beforemoney, $aftermoney);
        }
        else
        {
            return false;
        }
    
        
    }
}