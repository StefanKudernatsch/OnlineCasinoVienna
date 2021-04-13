<div class="home-div">
    <section class="Home1 Title">
        <h1> Online Casino Vienna</h1>
    </section>

    <section class="parallax">
        <div class="container">
            <div>
                <h2 class="h2">Schlafzimmer</h2>
            </div>
        </div>
    </section>

    <section class="wk">
        <div class="container">
            <div>
                <h2><a class="anchor" id="wohnzimmer"></a>Wohnzimmer</h2>
            </div>
            <div class="row">
                <div class="col-md-4">
                    <h3>Licht</h3>
                    <img src="light_on.png" alt="Error">
                    <p>Licht an</p>
                </div>
                <div class="col-md-4">
                    <h3>Temperatur</h3>
                    <img src="temp_high.jpg" alt="Error">
                    <p>22 Grad</p>
                </div>
                <div class="col-md-4">
                    <h3>Details</h3>
                    <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc enim neque, accumsan sed tincidunt nec, malesuada et turpis. Sed ut eleifend diam. Vivamus nec nisi quis est congue efficitur. Nulla id hendrerit magna. Suspendisse aliquam risus condimentum purus laoreet facilisis. Aliquam placerat placerat libero, ut tristique libero lacinia ac. Proin tristique fermentum nulla eu egestas. Nulla vel odio sollicitudin, venenatis magna sit amet, eleifend elit. Donec vehicula malesuada mi vel sagittis. Cras quis egestas nunc. Donec id laoreet lectus. Nunc et porta arcu, a cursus nisl.</p>
                </div>
            </div>
        </div>
    </section>
    <?php
    if(isset($_SESSION["UserName"])) {
        echo "<p>You are logged in as ". $_SESSION["UserName"] . "</p>";
    }
    ?>
</div>
