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
        if($DB->getUser($_POST["UserName"])->getUserName() == NULL) {
            echo "<script language='JavaScript'>alert('Login incorrect')</script>";
        } else {
            echo "<script language='JavaScript'>alert('Account deactivated')</script>";
        }
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

</head>
<body>
<header>
   <?php include "inc/header.php"; ?>
</header>

<main id="main" style="margin-left: 60px">

    <span><a style='margin-top: 5px; margin-left: -10px' href="#" class="btn btn-primary float-right" data-toggle="dropdown"><i
                    class="fas fa-sign-in-alt"></i>
                    Log In</a><ul id="login-dp" class="dropdown-menu dropdown-menu-right">
                    <li>
                        <div class="row">
                            <div class="col-12">
                                <h2 class="text-center">Log in</h2>
                                <hr/>
                                <div class="login-form">
                                    <form method="post">

                                        <div class="form-group">
                                            <input type="text" id="username" name="UserName"
                                                   class="form-control"
                                                   placeholder="Username" required>
                                        </div>
                                        <div class="form-group">
                                            <input type="password" id="password" name="Password"
                                                   class="form-control"
                                                   placeholder="Password" required>
                                        </div>
                                        <div class="clearfix">
                                            <input type="checkbox" name="RememberMe" id="checkbox">
                                            <label for="checkbox" class="form-check-label">Remember
                                                me</label>

                                        </div>
                                        <div class="form-group">
                                            <button type="submit" name="Login"
                                                    class="btn btn-primary btn-block float-left">Log in
                                            </button>
                                        </div>
                                        <div class="form-group">
                                            <a href='#resetUserPW' data-toggle='modal'
                                               class="btn btn-danger btn-block float-left">Forgot Password?</a>
                                        </div>
                                        <div class="form-group">
                                            <a href="?page=UserForm"
                                               class="btn btn-info btn-block float-left">Register</a>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul></span>
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