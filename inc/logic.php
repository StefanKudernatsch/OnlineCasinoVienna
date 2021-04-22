

<?php
if(isset($_POST["btnAddMoney"])) {
    $user = $DB->getUserWithName($_SESSION["UserName"]);
    $newMoney = intval($_POST["addMoney"]);
    if ($DB->addMoney($user->getUserID(), $newMoney, "test")) {
        //echo "<script language='JavaScript'>alert('Successfully added Money')</script>";
        //echo '<div class="alert alert-success" role="alert">Successfully added ', $newMoney, ' $ to your Account!</div>';
        ?> 
        <script> //$("#alertDiv").text('<div class="alert alert-success" role="alert">Successfully added ', $newMoney, ' $ to your Account!</div>') </script>
        <?php
    }
}

?>