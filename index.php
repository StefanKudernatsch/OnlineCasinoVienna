<?php
//PHP CONFIG with session_start()
require_once 'config/config.php';
//MODEL
require_once 'classes/DB.php';
require_once 'classes/User.php';
$DB = new DB();
//include
require_once 'inc/logic.php';

if (isset($_POST["login-submit"])) {
    $loginUsername = $_POST["log_username"];
    $loginPassword = $_POST["log_password"];
    if ($DB->getUserActiveWithName($loginUsername)) {
        $ergebnis = $DB->loginUser($loginUsername, $loginPassword);
        if ($ergebnis == true) {
            if (isset($_POST["RememberMe"])) {
                setcookie("CookieName", $loginUsername, time() + 3600);
            }
            echo "<script language='JavaScript'>alert('Login successfully')</script>";
        } else {
            echo "<script language='JavaScript'>alert('Login incorrect')</script>";
        }
    } else {
        echo "<script language='JavaScript'>alert('Account deactivated')</script>";
    }

} else if (!isset($_SESSION["UserName"]) && isset($_COOKIE["CookieName"])) {
    $_SESSION["UserName"] = $_COOKIE["CookieName"];
}

if (isset($_POST['RegisterUser'])) {
    $UserData = $_POST['user'];
    $CheckInput = true;
    for ($i = 0; $i < 10; $i++) {
        /*
         * 4 ... EMail
         * 9 ... Password
         * 1 ... Birthday
         */
        if ($i != 1 && $i != 4 && $i != 9) {
            if (preg_match('/[\'^£$%&*()}{@#~?><>,|=_+¬;-]/', $UserData[$i])) {

                $CheckInput = false;
                echo "<script language='JavaScript'>alert('Error1 | Special characters are not allowed')</script>";
                break;
            }
        }
    }
    if (preg_match('/[\'^£$%&*()}{#~?><>,|=_+¬;-]/', $UserData[4])) {

        $CheckInput = false;
        echo "<script language='JavaScript'>alert('Error2 | Special characters are not allowed')</script>";
    }
    if ($CheckInput == true) {
        $User = new User((int)$UserData[0], $UserData[1], $UserData[2], $UserData[3], $UserData[4], (int)$UserData[5], $UserData[6], $UserData[7], $UserData[8], $UserData[9], 100, 1, 0);
        if ($DB->registerUser($User)) {
            $tempuser = $DB->getUserWithName($UserData[7]);
            $tempuserid = $tempuser->getUserID();
            $DB->uploadImage("res/assets/img/avatars/standard-image.png", $tempuserid);
            echo "<script language='JavaScript'>alert('Account created successfully')</script>";
        } else {

            echo "<script language='JavaScript'>alert('Error | Create account failed')</script>";
        }
    }
}

if (isset($_POST["pw-submit"])) {

    $tempuser = $DB->getUserWithName($_SESSION["UserName"]);
    $tempuserid = $tempuser->getUserID();
    $return_val = $DB->updateUserPW($tempuserid, $_POST["old_pw"], $_POST["new_pw"]);
    if ($return_val == 0) {
        echo "<script language='JavaScript'>alert('Password changed')</script>";
    } else if ($return_val == 1) {
        echo "<script language='JavaScript'>alert('Failed to change password')</script>";
    } else if ($return_val == 2) {
        echo "<script language='JavaScript'>alert('Old password not correct')</script>";
    }
}

if (isset($_POST["photo-submit"])) {
    if ($_FILES["new_photo"]["error"] == 0) {
        if ($_FILES["new_photo"]["type"] != "image/jpeg" && $_FILES["new_photo"]["type"] != "image/png" && $_FILES["new_photo"]["type"] != "image/jpg") {
            echo "<script language='JavaScript'>alert('Error | Only upload .jpgs and .png')</script>";
        } else {
            $tempuser = $DB->getUserWithName($_SESSION["UserName"]);
            $tempuserid = $tempuser->getUserID();
            $DB->uploadImage($_FILES["new_photo"]["tmp_name"], $tempuserid);
        }
    } else {
        echo "<script language='JavaScript'>alert('Error | Upload of image failed')</script>";
    }
}


?>
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title>OnlineCasinoVienna</title>

    <!-- new -->
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
            integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
            crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
            integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
            crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
            integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
            crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
          integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

    <link rel="stylesheet" href="res/assets/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i">
    <link rel="stylesheet" href="res/assets/fonts/fontawesome-all.min.css">
    <link rel="stylesheet" href="res/assets/fonts/font-awesome.min.css">
    <link rel="stylesheet" href="res/assets/fonts/fontawesome5-overrides.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>

    <script src="dist/myScript.js"></script>
    <link rel="stylesheet" href="res/css/style.css">

</head>
<body id="page-top">
<div id="wrapper">
    <nav class="navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-dark p-0">
        <div class="container-fluid d-flex justify-content-center align-items-center p-0"><a
                    class="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0" href="#">
                <div class="sidebar-brand-icon rotate-n-15"><i class="fas fa-dice"></i></div>
                <div class="sidebar-brand-text mx-3"><span>OCV</span></div>
            </a>
            <hr class="sidebar-divider my-0">
            <ul class="navbar-nav text-light" id="accordionSidebar">
                <li class="nav-item"><a
                            class="nav-link d-flex justify-content-center align-items-center sidebar-brand m-0"
                            href="?page=home">
                        <div class="sidebar-brand-icon"><i class="fas fa-home"></i></div>
                        <div class="sidebar-brand-text"><span>Home</span></div>
                    </a>
                </li>
                <?php
                if (!isset($_SESSION["UserName"])) {
                    ?>
                    <li class="nav-item"><a
                                class="nav-link d-flex justify-content-center align-items-center sidebar-brand m-0"
                                href="?page=LogIn">
                            <div class="sidebar-brand-icon"><i class="fas fa-sign-in-alt"></i></div>
                            <div class="sidebar-brand-text"><span>Login</span></div>
                        </a>
                    </li>
                    <li class="nav-item"><a
                                class="nav-link d-flex justify-content-center align-items-center sidebar-brand m-0"
                                href="?page=Register">
                            <div class="sidebar-brand-icon"><i class="far fa-user-circle"></i></div>
                            <div class="sidebar-brand-text"><span>Register</span></div>
                        </a>
                    </li>
                    <?php
                } else {
                    ?>
                    <li class="nav-item"><a
                                class="nav-link d-flex justify-content-center align-items-center sidebar-brand"
                                href="?page=UserForm">
                            <div class="sidebar-brand-icon"><i class="fas fa-user"></i></div>
                            <div class="sidebar-brand-text" style=""><span>Profile</span></div>
                        </a>
                    </li>
                    <li class="nav-item"><a
                                class="nav-link d-flex justify-content-center align-items-center sidebar-brand"
                                href="?page=logout">
                            <div class="sidebar-brand-icon"><i class="fas fa-sign-out-alt"></i></div>
                            <div class="sidebar-brand-text"><span>Logout</span></div>
                        </a>
                    </li>
                    <?php
                } ?>
            </ul>
        </div>
    </nav>
    <div class="d-flex flex-column" id="content-wrapper">
        <div id="content bg-image"
             style="background-image: url('res/img/home/headerimg.png'); background-repeat: no-repeat;">
            <div class="mask" style="background-color: rgba(0, 0, 0, 0.4);">
                <nav class="navbar navbar-light navbar-expand bg-white shadow mb-4 topbar static-top">
                    <div class="container-fluid">
                        <button class="btn btn-link rounded-circle me-3" id="sidebarToggleTop" type="button"><i
                                    class="fas fa-bars"></i></button>
                        <?php if (isset($_SESSION["UserName"]) && $_SESSION["UserName"] != "admin") { ?>
                            <ul class="navbar-nav flex-nowrap ms-auto">
                                <?php if (isset($_SESSION["UserName"])) {
                                    $tempuser = $DB->getUserWithName($_SESSION["UserName"]);
                                    echo '<span style="color: green"><br>' . $DB->getMoney($tempuser->getUserID()) . '&nbsp<i class="fas fa-euro-sign"></i></span>';
                                } ?>

                                <div class="d-block topbar-divider"></div>
                                <li class="nav-item dropdown no-arrow">
                                    <div class="nav-item dropdown no-arrow"><a class="dropdown-toggle nav-link"
                                                                               aria-expanded="false"
                                                                               data-bs-toggle="dropdown"
                                                                               href="#"
                                                                               style="padding-left: 0!important;">
                                    <span id="logged_user"
                                          class=" d-lg-inline me-2 text-gray-600 small"><?php if (isset($_SESSION["UserName"])){
                                            $image = $DB->getUserImage($DB->getUserWithName($_SESSION["UserName"])->getUserID());
                                            echo $_SESSION["UserName"] . '</span><img
                                            class="border rounded-circle img-profile"
                                            src="data:image/png;base64,' . base64_encode($image) . '"></a>';

                                            ?>
                                            <div class="dropdown-menu shadow dropdown-menu-end animated--grow-in"><a
                                                        class="dropdown-item" href="?page=UserForm"><i
                                                            class="fas fa-user fa-sm fa-fw me-2 text-gray-400"></i>&nbsp;Profile</a><a
                                                        class="dropdown-item" href="#"><i
                                                            class="fas fa-list fa-sm fa-fw me-2 text-gray-400"></i>&nbsp;Activity
                                        log</a>
                                    <div class="dropdown-divider"></div>
                                    <a class="dropdown-item" href="?page=logout"><i
                                                class="fas fa-sign-out-alt fa-sm fa-fw me-2 text-gray-400"></i>&nbsp;Logout</a>
                                </div>
                                        <?php } else { ?> </span><img
                                                    class="border rounded-circle img-profile"
                                                    src="res/assets/img/avatars/standard-image.png"></a>
                                        <div class="dropdown-menu shadow dropdown-menu-end animated--grow-in"><a
                                                    class="dropdown-item" href="?page=LogIn"><i
                                                        class="fas fa-user fa-sm fa-fw me-2 text-gray-400"></i>&nbsp;Login</a>
                                        </div>
                                        <?php } ?>
                                    </div>
                                </li>
                            </ul>
                        <?php } ?>
                    </div>
                </nav>
                <header>

                </header>

                <main id="main">
                    <?php
                    if (!isset($_GET["page"])) {
                        include "inc/home.php";
                    } else {
                    switch ($_GET["page"]) {
                    default:
                    {
                        include "inc/home.php";
                    }
                    case 'UserForm': {
                    if (isset($_SESSION["UserName"])) {
                    $temp_user = $DB->getUserWithName($_SESSION["UserName"]);
                    if ($_SESSION["UserName"] != "admin") {
                    ?>
                    <script type="text/javascript">
                        username = "<?= $_SESSION["UserName"] ?>";
                    </script>
                    <?php
                    } else {
                    if ($_SESSION["UserName"] == "admin" || $_SESSION["UserName"] == $_GET["selected"]){
                    ?>
                    <script type="text/javascript">
                        selected = "<?= $_GET["selected"] ?>";
                    </script>
                    <?php
                }

                }
                include "inc/profile.html";
                } else {
                    include "inc/login.html";
                }
                            break;
                        }
                        case 'home':
                        {
                            include "inc/home.html";
                            break;
                        }
                        case 'LogIn':
                        {
                            include "inc/login.html";
                            break;
                        }
                        case 'Register':
                        {
                            include "inc/register.html";
                            break;
                        }
                        case 'logout':
                        {
                            setcookie("CookieName", "", time() - 3600);
                            unset($_SESSION["UserName"]);
                            session_destroy();
                            header("Location: index.php");
                            break;
                        }
                case 'UserList':
                {
                    if ($_SESSION["UserName"] == "admin") {
                        include "inc/table.html";
                    } else {
                        include "inc/profile.html";
                    }

                    break;
                }
                case 'home':
                {
                    include "inc/home.php";
                    break;
                }
                case 'LogIn':
                {
                    include "inc/login.html";
                    break;
                }
                case 'Register':
                {
                    include "inc/register.html";
                    break;
                }
                case 'logout':
                {
                    setcookie("CookieName", "", time() - 3600);
                    unset($_SESSION["UserName"]);
                    session_destroy();
                    header("Location: index.php");
                    break;
                }
                case 'moneyAdmin':
                {
                if (isset($_SESSION["UserName"])) {

                ?>
                    <script type="text/javascript">
                        username = "<?= $_SESSION["UserName"] ?>";
                    </script>
                    <?php

                    }
                    include "inc/moneyAdmin.html";
                    break;
                    }
                    }
                    }
                    ?>
                </main>
            </div>
        </div>

        <footer class="bg-white sticky-footer">
            <div class="container my-auto">
                <div class="text-center my-auto copyright font-monospace"><span>Copyright © Brand 2021</span></div>
            </div>
        </footer>
    </div>
    <a class="border rounded d-inline scroll-to-top" href="#page-top"><i class="fas fa-angle-up"></i></a>
</div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<script src="res/assets/js/jquery.min.js"></script>
<script src="res/assets/bootstrap/js/bootstrap.min.js"></script>
<script src="res/assets/js/chart.min.js"></script>
<script src="res/assets/js/bs-init.js"></script>
<!--<script src="res/https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.4.1/jquery.easing.js"></script>-->
<script src="res/assets/js/theme.js"></script>
<script src="dist/myScript.js"></script>
</body>
</html>