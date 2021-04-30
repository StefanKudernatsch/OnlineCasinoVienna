<?php
//PHP CONFIG with session_start()
require_once 'config/config.php';
//MODEL
require_once 'classes/DB.php';
require_once 'classes/User.php';
$DB = new DB();
//include
require_once 'inc/logic.php';

if (!isset($_SESSION["UserName"])) {
    if (isset($_COOKIE["CookieName"])) {
        $_SESSION["UserName"] = $_COOKIE["UserName"];
    }
}


?>
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title>OnlineCasinoVienna</title>
    <link rel="stylesheet" href="res/assets/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i">
    <link rel="stylesheet" href="res/assets/fonts/fontawesome-all.min.css">
    <link rel="stylesheet" href="res/assets/fonts/font-awesome.min.css">
    <link rel="stylesheet" href="res/assets/fonts/fontawesome5-overrides.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="dist/myScript.js"></script>
    <link rel="stylesheet" href="res/css/style.css">

</head>
<body id="page-top">
<div id="wrapper">
    <nav class="navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0">
        <div class="container-fluid d-flex justify-content-center align-items-center p-0"><a class="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0" href="#">
                <div class="sidebar-brand-icon rotate-n-15"><i class="fas fa-dice"></i></div>
                <div class="sidebar-brand-text mx-3"><span>OCV</span></div>
            </a>
            <hr class="sidebar-divider my-0">
            <ul class="navbar-nav text-light" id="accordionSidebar">
                <li class="nav-item"><a class="nav-link d-flex justify-content-center align-items-center" href="?page=home"><i class="fas fa-home me-1 me-md-2"></i><span>Home</span></a></li>
                <li class="nav-item"><a class="nav-link d-flex justify-content-center align-items-center" href="?page=UserForm"><i class="fas fa-user me-1 me-md-2"></i><span>Profile</span></a></li>
                <?php
                if(!isset($_SESSION["UserName"])){
                ?>
                <li class="nav-item"><a class="nav-link d-flex justify-content-center align-items-center" href="?page=LogIn"><i class="far fa-user-circle me-1 me-md-2"></i><span>Login</span></a></li>
                <?php
                }
                else {
                ?>
                <li class="nav-item"><a class="nav-link d-flex justify-content-center align-items-center" href="?page=logout"><i class="far fa-user-circle me-1 me-md-2"></i><span>Logout</span></a></li>
                <?php
                } ?>
            </ul>
            <div class="text-center d-none d-md-inline"><button class="btn rounded-circle border-0" id="sidebarToggle" type="button"></button></div>
        </div>
    </nav>
    <div class="d-flex flex-column" id="content-wrapper">
        <div id="content">
            <nav class="navbar navbar-light navbar-expand bg-white shadow mb-4 topbar static-top">
                <div class="container-fluid"><button class="btn btn-link d-md-none rounded-circle me-3" id="sidebarToggleTop" type="button"><i class="fas fa-bars"></i></button>
                    <ul class="navbar-nav flex-nowrap ms-auto">
                        <div class="d-none d-sm-block topbar-divider"></div>
                        <li class="nav-item dropdown no-arrow">
                            <div class="nav-item dropdown no-arrow"><a class="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#"><span id="logged_user" class=" d-lg-inline me-2 text-gray-600 small"><?php if(isset($_SESSION["UserName"])){echo $_SESSION["UserName"];}?></span><img class="border rounded-circle img-profile" src="res/assets/img/avatars/avatar1.jpeg"></a>
                                <div class="dropdown-menu shadow dropdown-menu-end animated--grow-in"><a class="dropdown-item" href="#"><i class="fas fa-user fa-sm fa-fw me-2 text-gray-400"></i>&nbsp;Profile</a><a class="dropdown-item" href="#"><i class="fas fa-cogs fa-sm fa-fw me-2 text-gray-400"></i>&nbsp;Settings</a><a class="dropdown-item" href="#"><i class="fas fa-list fa-sm fa-fw me-2 text-gray-400"></i>&nbsp;Activity log</a>
                                    <div class="dropdown-divider"></div><a class="dropdown-item" href="#"><i class="fas fa-sign-out-alt fa-sm fa-fw me-2 text-gray-400"></i>&nbsp;Logout</a>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
<header>

</header>

<main id="main">
    <?php
    if(!isset($_GET["page"])) {
        include "inc/home.php";
    } else {
        switch ($_GET["page"]) {
            default: {
                include "inc/home.php";
            }
            case 'UserForm':{
                include "inc/profile.html";
                break;
            }
            case 'home':{
                include "inc/home.php";
                break;
            }
            case 'LogIn':{
                include "inc/login.html";
                break;
            }
            case 'Register':{
                include "inc/register.html";
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

        </div>
        <footer class="bg-white sticky-footer">
            <div class="container my-auto">
                <div class="text-center my-auto copyright"><span>Copyright © Brand 2021</span></div>
            </div>
        </footer>
    </div><a class="border rounded d-inline scroll-to-top" href="#page-top"><i class="fas fa-angle-up"></i></a>
</div>
<script src="res/assets/js/jquery.min.js"></script>
<script src="res/assets/bootstrap/js/bootstrap.min.js"></script>
<script src="res/assets/js/chart.min.js"></script>
<script src="res/assets/js/bs-init.js"></script>
<script src="res/https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.4.1/jquery.easing.js"></script>
<script src="res/assets/js/theme.js"></script>
</body>
</html>