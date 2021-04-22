
    <section class="header parallax">
        <div class="container">
            <img  class="logo" src="res/img/logo.png" alt="Logo">
            <h1> Online Casino Vienna</h1>

        </div>
    </section>

    <section class="LogIn">
        <div class="container">
            <div>
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
                            <div class="form-check">
                                <input type="checkbox" class="form-check-input" name="RememberMe" id="checkbox">
                                <label for="checkbox" class="form-check-label">Remember
                                    me</label>

                            </div>
                            <div class="form-group">
                                <button type="submit" name="Login"
                                        class="btn btn-primary btn-block float-left">Log in
                                </button>
                            </div>
                            <div class="row">
                                <div class="col-md-6 form-group">
                                    <a href='#resetUserPW' data-toggle='modal'
                                       class="btn btn-danger btn-block float-left">Forgot Password?</a>
                                </div>
                                <div class="col-md-6 form-group">
                                    <a href="?page=UserForm"
                                       class="btn btn-info btn-block float-left">Register</a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <?php
        if(isset($_SESSION["UserName"])) {
            echo "<p>You are logged in as ". $_SESSION["UserName"] . "</p>";
        }
        ?>
    </section>



    <section class="secondpic parallax">
    </section>




