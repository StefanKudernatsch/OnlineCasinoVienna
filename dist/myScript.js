let user = [];
let username;
let selected;


$(document).ready(function () {

    console.log(username);
    console.log(selected);


    if(window.location.search === "?page=UserForm&selected=" + selected) {
            loadProfile(selected);
            addMoneyField();
    }
    else if(window.location.search === "?page=UserForm"){
        loadProfile(username);
    }
    else if(window.location.search === "?page=UserList") {
        getAllUser();
    }
    else if(selected !== username && username !== "admin"){
        window.location.href = "?page=home";
    }
    $("#banUserSubmit").click(function(){
        banUser($("#user_to_ban").html())
    });
});



function getAllUser(){
    $.ajax
    ({
        type: "GET",
        url: "./inc/serviceHandler.php",
        data: {method: "getUserList", param: null},
        cache: false,
        dataType: "json",
        success: function (data) {
            let table_body = document.getElementById("usertable-body");
            data.forEach(function (userobject){
                let temp_tr = document.createElement("tr");
                //temp_tr.className = "d-flex";
                console.log(userobject);

                let data_arr = [userobject.UserName, userobject.UserEMail, userobject.UserMoney, userobject.UserActive, userobject.UserBanned];
                for (let i = 0; i < data_arr.length; i++) {
                    let temp_td = document.createElement("td");
                    temp_td.style.borderWidth = "0";
                    let temp_textnode = document.createTextNode(data_arr[i]);
                    switch (i) {
                        case 0: {
                            let temp_img = document.createElement("img");
                            temp_img.src = 'data:image/png;base64,'+userobject.UserImage;
                            temp_img.className = "rounded-circle me-2";
                            temp_img.height = "30";
                            temp_img.width = "30";
                            temp_td.className = "col-4";
                            temp_td.onclick = function() {
                                window.location.href = "?page=UserForm&selected=" + data_arr[0];
                            };
                            temp_td.append(temp_img);
                            temp_td.append(temp_textnode);
                            break;
                        }
                        case 1: {
                            temp_td.className = "col-4";
                            temp_td.append(temp_textnode);
                            break;
                        }
                        case 2: {
                            temp_td.className = "col-2";
                            temp_td.append(temp_textnode);
                            break;
                        }
                        case 3: {

                        }
                        case 4: {
                            temp_td.className = "col-1";
                            let temp_i = document.createElement("i");
                            if(data_arr[i] === 1){
                                temp_i.className = "fas fa-check-circle";
                                temp_i.style.color = "green";
                            }
                            else if(data_arr[i] === 0)
                            {
                                temp_i.className = "fas fa-times-circle";
                                temp_i.style.color = "red";
                            }
                            if(i === 4){
                                let temp_a = document.createElement("a");
                                temp_a.href = "#";
                                temp_a.onclick = function() {
                                    $("#user_to_ban").html(data_arr[0]);
                                    $('#banModal').modal('show');
                                };
                                temp_a.append(temp_i);
                                temp_td.append(temp_a);
                            }
                            else {
                                temp_td.append(temp_i);
                            }
                            break;
                        }
                    }
                    temp_tr.append(temp_td);
                }
                table_body.append(temp_tr);
            });
        },
        error: function (request, status, error) {
            alert("Failed to get Userdata");
        }
    });
}


function banUser(ban_name){
    let data = {UserToBan: ban_name};
    console.log(data);
    $.ajax
    ({
        type: "POST",
        url: "./inc/serviceHandler.php",
        data: JSON.stringify(data),
        cache: false,
        success: function () {
        },
        error: function (request, status, error) {
            alert(error);
        }
    });
}


function loadProfile(currentUser) {

    console.log(currentUser);
    $.ajax
    ({
        type: "GET",
        url: "./inc/serviceHandler.php",
        data: {method: "getUserWithName", param: currentUser},
        cache: false,
        dataType: "json",
        success: function (data) {
            let i = 0;
            Object.keys(data).forEach(function (userkey) {
                user[i] = data[userkey];
                i++;
            });

            for (let j = 1; j < 11; j++) {
                if(j !== 9) {
                    console.log("Userarray["+j+"]: "+user[j]);
                    document.getElementById("user["+j+"]").value = user[j];
                }
            }
            document.getElementById("user[11]").src = 'data:image/png;base64,'+user[11];
            console.log("Userarray[12]: "+user[12]);
            console.log("Userarray[13]: "+user[13]);
            console.log("Userarray[14]: "+user[14]);
        },
        error: function (request, status, error) {
            alert("Failed to get Userdata");
        }
    });
}


function editSettings() {
    console.log("Change");
    $(".form-control").prop("readonly",false);
    $(".form-select").prop("disabled",false);
    $("#save-edit-user").html("Save Settings");
    $("#save-edit-user").attr("onclick","saveSettings()");
}


function saveSettings() {
    console.log("Saved");
    console.log("ID: " + user[0]);
    for (let i = 1; i < 11; i++) {
        if(i != 9) {
            user[i] = document.getElementById("user["+i+"]").value;
            console.log("user["+i+"]: " + user[i]);
        }

    }
    let data = {User: user};

    $.ajax
    ({
        type: "POST",
        url: "./inc/serviceHandler.php",
        data: JSON.stringify(data),
        cache: false,
        dataType: "json",
        success: function () {
            $(".form-control").prop("readonly",true);
            $(".form-select").prop("disabled",true);
            $("#save-edit-user").html("Edit Settings");
            $("#save-edit-user").attr("onclick","editSettings()");
            $("#logged_user").html(user[8]);
        },
        error: function (request, status, error) {
            alert("Failed to update User");
        }
    });
}


function changePassword(){
    let id = user[0];
    let old_password = document.getElementById("old_pw").value;
    let new_password = document.getElementById("new_pw").value;
    let data = {oldPW: old_password, newPW: new_password, ID: id};
    $.ajax
    ({
        type: "POST",
        url: "./inc/serviceHandler.php",
        data: JSON.stringify(data),
        cache: false,
        dataType: "json",
        success: function () {
            alert("Worked");
        },
        error: function (request, status, error) {
            alert("Failed to update User");
        }
    });
}