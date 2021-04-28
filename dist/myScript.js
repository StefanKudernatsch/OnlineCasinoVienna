$(document).ready(function () {
    $("#login-submit").click(function (e) {
        logInUser();
    });

});


function logInUser(){

    let log_user = $('#username').val();
    let log_pw = $('#password').val();
    let data = {LogUser: log_user, LogPW: log_pw};

    $.ajax
    ({
        type: "POST",
        url: "./inc/serviceHandler.php",
        data: JSON.stringify(data),
        cache: false,
        dataType: "json",
        success: function () {
            window.location.href="index.php?page=home";
        },
        error: function (request, status, error) {
            alert("Username or Password wrong");
        }
    });
}