<?php
//PHP CONFIG with session_start()
require_once 'config/config.php';
//MODEL
require_once 'classes/DB.php';
require_once 'classes/User.php';
$DB = new DB();

if (!isset($_SESSION["UserName"])) {
    if (isset($_COOKIE["CookieName"])) {
        $_SESSION["UserName"] = $_COOKIE["UserName"];
    }
}

if (isset($_POST["Login"])) {
    $loginUsername = $_POST["UserName"];
    $loginPassword = $_POST["Password"];
    var_dump($loginPassword);
    var_dump($loginUsername);
    if($DB->getUserActiveWithName($loginUsername)) {
        if ($DB->loginUser($loginUsername, $loginPassword)) {
            if (isset($_POST["RememberMe"])) {
                setcookie("UserName", $loginUsername, time() + 3600);
            }
            echo "<script language='JavaScript'>alert('Login successfully')</script>";
        } else {
            echo "<script language='JavaScript'>alert('Login incorrect')</script>";
        }
    } else {
        if($DB->getUserWithName($_POST["UserName"])->getUserName() == NULL) {
            echo "<script language='JavaScript'>alert('Login incorrect')</script>";
        } else {
            echo "<script language='JavaScript'>alert('Account deactivated')</script>";
        }
    }
}
else if(isset($_POST["btnAddMoney"])) {
    $user = $DB->getUserWithName($_SESSION["UserName"]);
    if ($DB->addMoney($user->getUserID(), intval($_POST["addMoney"]), "test")) {
        echo "<script language='JavaScript'>alert('Successfully added Money')</script>";
    }
}
?>
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta property="og:type" content="website">
    <meta name="description" content="The online casino of Vienna in 2021!">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="application-name" content="OnlineCasinoVienna">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"
          integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="res/css/style.css">
    <title>OnlineCasinoVienna</title>
    <!-- Fonts Awesome -->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.8/css/all.css">

    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
            integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
            crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx"
            crossorigin="anonymous"></script>

    
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script> <!-- Full JQuery Version, for animations -->

</head>
<body>
<header>
   <?php include "inc/header.php"; ?>
</header>

<main id="main" style="margin-left: 60px">
    <?php
    if(!isset($_GET["page"])) {
        include "inc/home.php";
    } else {
        switch ($_GET["page"]) {
            default: {
                include "inc/home.php";
            }
            case 'UserForm':{
                include "inc/UserForm.php";
                break;
            }
            case 'home':{
                include "inc/home.php";
                break;
            }
            case 'logout':{
                setcookie("CookieName", "", time() - 3600);
                unset($_SESSION["UserName"]);
                session_destroy();
                header("Location: index.php");
                break;
            }
        }
    }
    ?>
</main>

<footer>

</footer>
</body>
</html>