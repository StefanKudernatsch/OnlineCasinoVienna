<div class="home-div">
<h2>Online Casino Vienna</h2>
    <?php
    if(isset($_SESSION["UserName"])) {
        echo "<p>You are logged in as ". $_SESSION["UserName"] . "</p>";
    }
    ?>
</div>
