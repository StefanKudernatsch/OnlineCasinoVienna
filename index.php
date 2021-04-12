<?php
//PHP CONFIG with session_start()
require_once 'config/config.php';
//MODEL
require_once 'classes/DB.php';
require_once 'classes/User.php';

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
</head>
<body>
<?php
require_once "inc/UserForm.php";
?>
</body>
</html>