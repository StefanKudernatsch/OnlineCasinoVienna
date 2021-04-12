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
                <span class="title">Profile</span>
            </a>
        </li>
        <li>
            <a href="?page=imprint">
                <span class="icon"><i class="fas fa-info-circle fa-lg"></i></span>
                <span class="title">Imprint</span>
            </a>
        </li>
        <li>
            <a href="?page=help">
                <span class="icon"><i class="fas fa-question-circle fa-lg"></i></span>
                <span class="title">Help</span>
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
