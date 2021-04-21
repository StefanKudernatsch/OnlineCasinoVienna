
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

    <section class="moneyForm">
        <div class="container moneyDiv">
            <div class="row">
                <div class="col-12">
                    <h2 class="text-center" id="moneyH">Money Management</h2>
                    <button id="moneyBtn" class="btn btn-primary">Press</button>
                    <button id="moneyBtn2" class="btn btn-primary">Number 2</button>
                    <div id="tableDiv">
                        <table class="table moneyTable" id="moneyTable">
                            <tr>
                                <td>Your Balance: </td>
                                <td id="balance"> <?php 
                                    $user = $DB->getUserWithName($_SESSION["UserName"]);
                                    echo "&nbsp",  $DB->getMoney($user->getUserID());
                                ?> </td>
                            </tr>
                            <tr>
                                <td>Test: </td>
                                <td id="moneyTest"> Hello </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
            
            <div class="row">
                <div class="col-12">
                    <form method="post">
                        <div class="form-group addMoney">
                            <input type="text" id="addMoney" name="addMoney" class="form-control" placeholder="Add Money">
                            <button type="submit" id="btnAddMoney" name="btnAddMoney" class="btn btn-primary">Add Money</button>
                        </div>
                    </form>
                </div>
            </div>
            

                
            </div>
            <script>
                $(document).ready(function() {
                    $("#moneyTest").text("Hello Menschen!");

                    $("#moneyBtn").mouseenter(function() {
                        $("#moneyTest").text("Guten Tag World!");
                        $("#balance").text("alot");
                        $("#moneyTest").text("Guten Tag Meister!");
                    })
                    $("#moneyBtn").mouseleave(function() {
                        $("#moneyTest").text("Hello World!");
                    })
                    $("#moneyBtn").click(function() {
                        //$("#tableDiv").slideUp(); 
                        $("#tableDiv").fadeOut(1000);
                        $("#moneyBtn").animate( {
                            height: "+=10px",
                            width: "+=10px",
                        }, 30, function() {
                            $("#moneyBtn").animate( {
                                height: "-=10px",
                                width: "-=10px",
                            })
                        });
                    })
                    $("#moneyBtn2").click(function() {
                        //$("#tableDiv").slideDown();
                        $("#tableDiv").fadeIn(1000);
                    })
                })
            </script>
        </div>
    </section>

    <section class="thirdpic parallax">
    </section>




