<?php
?>
<div id="navbar" class="navbar" onmouseover="openNav()" onmouseleave="closeNav()">
    <ul>
        <li>
            <a href="?page=home">
                <span class="icon"><i class="fas fa-home fa-lg"></i></span>
                <span class="title">Home</span>
            </a>
        </li>
        <li>
            <a href="?page=UserForm">
                <span class="icon"><i class="fas fa-user-circle fa-lg"></i></span>
                <span class="title">Profil</span>
            </a>
        </li>
        <li>
            <a href="?page=imprint">
                <span class="icon"><i class="fas fa-info-circle fa-lg"></i></span>
                <span class="title">Impressum</span>
            </a>
        </li>
        <li>
            <a href="?page=help">
                <span class="icon"><i class="fas fa-question-circle fa-lg"></i></span>
                <span class="title">Hilfe</span>
            </a>
        </li>
        <li class="logout">
            <a href="?page=logout">
                <span class="icon"><i class="fas fa-sign-out-alt fa-lg"></i></span>
                <span class="title">Ausloggen</span>
            </a>
        </li>
    </ul>
</div>

<script>
    function openNav() {
        document.getElementById("navbar").style.width = "300px";
        document.getElementById("main").style.marginLeft = "300px";
    }

    function closeNav() {
        document.getElementById("navbar").style.width = "60px";
        document.getElementById("main").style.marginLeft = "60px";
    }
</script>