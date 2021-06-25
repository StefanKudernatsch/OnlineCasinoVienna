let user = [];
let username;
let selected;
let cardDeck = [];

function resizeMain(){
    document.getElementById("main").style.height = "0px";
    document.getElementById("main").style.height = document.getElementById("content").offsetHeight  + "px";
}

$(document).ready(function () {
    console.log(window.innerHeight)
    console.log(username);
    console.log(selected);

    if(window.location.search === "?page=UserForm&selected=" + selected) {
            loadProfile(selected);
    }
    else if(window.location.search === "?page=UserForm"){
        if(username !== undefined)
            loadProfile(username);
    }
    else if(window.location.search === "?page=BlackJack"){

        if(username !== undefined){
            getUserMoney(username);
            $('#startModal').modal({backdrop: 'static', keyboard: false})
            $("#startModal").modal('show');
            document.getElementById("game-button-1").setAttribute("onclick", "BJHit()");
            document.getElementById("game-button-1").textContent = "Hit";
            document.getElementById("game-button-2").setAttribute("onclick", "BJStand()");
            document.getElementById("game-button-2").textContent = "Stand";
            document.getElementById("game-button-3").setAttribute("onclick", "BJDoubleDown()");
            document.getElementById("game-button-3-full").textContent = "Double Down";
            document.getElementById("game-button-3-short").textContent = "DD";
            document.getElementById("game-button-4").setAttribute("onclick", "BJSurrender()");
            document.getElementById("game-button-4-full").textContent = "Surrender";
            document.getElementById("game-button-4-short").textContent = "Surr";
            document.getElementById("content").className = "deck";
            resizeMain();
            document.getElementById("main").className = "main";
            window.addEventListener('resize', resizeMain);
        }
    }
    else if(window.location.search === "?page=UserList") {
        if(username === undefined){
            getAllUser();
        }
        else {
            loadProfile(username);
        }
    }
    else if(selected !== username && username !== "admin"){
        window.location.href = "?page=home";
    }
    $("#banUserSubmit").click(function(){
        banUser($("#user_to_ban").html())
    });
});

function submitRaise(){
    $("#raiseModal").modal('hide');
    if($("#InputRaise").val() !== ""){
        pot = parseInt(pot) + parseInt($("#InputRaise").val());
        removeMoney($("#InputRaise").val());
        $("#pot").html(pot);
        $("#InputRaise").val("");
    }
}

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

function drawCommunityCard(number){
    let image = document.createElement("img");
    image.className = "playercard";
    image.src = "res/img/cards/current/" + number +".png";


    let div = document.getElementById("deck");
    let middlepart = document.getElementById("middlepart");
    let middlehand = document.getElementById("middlehand");
    let middlewrapper = document.getElementById("middlewrapper");
    let count = middlehand.childElementCount;
    let screenwidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    let card_padding = 5;
    if(screenwidth < 768){
        card_padding = 2;
    }
    div.append(image);
    let x = middlepart.offsetWidth - div.offsetWidth - ((middlewrapper.offsetWidth - middlehand.offsetWidth) / 2) - (card_padding*3) - (count * (div.offsetWidth + (card_padding*2)));

    setTimeout(function () {
        image.style.zIndex = '10000';
        image.style.transitionDuration = '0.5s';
        image.style.transform = 'translate('+ x + 'px,'+ 0 +'px)';
        setTimeout(function () {
            image.style.transitionDuration = '';
            image.style.transform = '';
            image.style.zIndex = '0';
            middlehand.append(image);
        }, 500);
    }, 1);
}

function drawCard(hand,number,open){

    let div = document.getElementById("deck");

    let main =  document.getElementById("main");
    let div1 = document.getElementById(hand);
    let middle = document.getElementById("middlepart");
    console.log(div1.clientWidth);
    let count = div1.childElementCount;


    let main_padding = parseInt(window.getComputedStyle(main, null).getPropertyValue('padding'), 10);
    console.log("max:"+main_padding);
    let screenwidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    let x = main.clientWidth/2 - main_padding - (div.clientWidth/2) - 10 + (count * ((div.clientWidth/2)+5));

    if(screenwidth < 768){
        x += 5;
    }
    let children = div1.children;


        for (let i = 0; i < children.length; i++) {
            let child = children[i];
            console.log("Xasd " + child.offsetLeft);
            //child.style.left = '"'+child.offsetLeft - (count*((div.clientWidth/2)+5)) + 'px"';
            //child.style.marginRight = "50px";
            setTimeout(function (){
                child.style.transitionDuration = '0.5s';
                child.style.transform = 'translate('+ -((div.clientWidth/2)+5)  + 'px,'+ 0 +'px)';
                setTimeout(function () {
                    child.style.transitionDuration = '';
                    child.style.transform = '';
                }, 500);
            }, 1);

        }

    let y;
    let image = document.createElement("img");
    image.className = "playercard";
    switch (hand){
        case "dealerhand": {
            y = -middle.offsetHeight/2 - (div1.offsetHeight/2) - document.getElementById("pot_main").offsetHeight;
            if(open){
                image.src = "res/img/cards/current/" + number +".png";
            }
            else {
                image.src = "res/img/cards/current/red_back.png";
            }
            break;
        }
        case "playerhand":{
            y = middle.offsetHeight/2 + (div1.offsetHeight/2) + document.getElementById("controls").offsetHeight;
            image.src = "res/img/cards/current/" + number +".png";
            break;
        }
    }

    console.log("X " + x);




    console.log("Wdidht " + screenwidth);
    div.append(image);
    setTimeout(function () {
        image.style.zIndex = '10000';
        image.style.transitionDuration = '0.5s';
        image.style.transform = 'translate('+ x + 'px,'+ y +'px)';
        setTimeout(function () {
            image.style.transitionDuration = '';
            image.style.transform = '';
            image.style.zIndex = '0';
            div1.append(image);
        }, 500);
    }, 1);
//167,795 + 143,845 + 48  hälfte middlepart + h#lfte von playerhand + controls height --> y

    //main width / 2 - shadow width - card width / 2 - 10px margin -->x



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

function removeMoney(money){
    let data = {user: username, rmMoney: money};
    $.ajax
    ({
        type: "POST",
        url: "./inc/serviceHandler.php",
        data: JSON.stringify(data),
        cache: false,
        dataType: "json",
        success: function () {
            getUserMoney(username);
        },
        error: function (request, status, error) {
            alert("Error");
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

var tableHeader = "<tr><th>ID</th><th>Username</th><th>Firstname</th><th>Lastname</th><th>Email</th><th>Money</th></tr>";
function searchUsers() {
    let search = $("#searchInput").val();
    $.ajax
    ({
        type: "GET",
        url: "./inc/serviceHandler.php",
        data: {method: "searchUser", param: search},
        cache: false,
        dataType: "json",
        success: function(response) {
            $("#testField").text("");
            if (response == "null") 
                $("#testField").text("Keine Treffer");
            else {
                let result;
                let table = $("#MoneyAdminTable");
                table.empty();
                table.append(tableHeader);
                response.forEach(function(item){
                    result += item;
                    let row = document.createElement("tr");
                    row.setAttribute("onclick", "createMoneyChangeRow(this)");
                    row.innerHTML = "<td class='test'>" + item["UserID"] + "</td><td>" + item["UserName"] + "</td><td>" + item["UserFirstName"] + 
                        "</td><td>" + item["UserLastName"] + "</td><td>" + item["UserEMail"] + "</td><td name='UserMoney'>" + item["UserMoney"] + "</td>";
                    table.append(row);
                });
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log ("ERROR.", textStatus, errorThrown);
        }
    })
} 

function createMoneyChangeRow(tablerow) {
    let moneyRow = document.getElementsByName("moneyChangeRow");
    //wenn kein moneyChangeRow existiert wird ein neues erstellt
    if (moneyRow[0] == null) {
        insertMoneyChangeRow();
    // wenn schon eines existiert...
    } else {
        //wenn es next sibling ist, wird nur dieses gelöscht, weil es dem User zugegeordnet ist, auf den man gerade geklickt hat.
        let nextSibling = tablerow.nextSibling;
        if (nextSibling != null && nextSibling.getAttribute("name") == "moneyChangeRow") {
            let rows = document.getElementsByName("moneyChangeRow");
            rows.forEach(function(item) {
                item.remove();
            });
        }
        //wenn es nicht nextSibling ist, heißt das, man hat auf einen anderen User geklickt. Das alte wird gelöscht und ein neues erstellt.
        else {
            let rows = document.getElementsByName("moneyChangeRow");
            rows.forEach(function(item) {
                item.remove();
            });
            insertMoneyChangeRow();
        } 
    }
    function insertMoneyChangeRow() {
        let row = document.createElement("tr");
        row.setAttribute("name", "moneyChangeRow");
        row.innerHTML = "<td colspan='4'><input type='text' id='moneyInput' placeholder='Change Money'>"+
        "<button class='btn btn-primary' style='background-color:skyblue' onclick='changeMoney(this)'>Change Money</button> </td>";
        tablerow.parentNode.insertBefore(row, tablerow.nextSibling);
    }
}

function changeMoney(button) {
    let moneyDelta = button.parentNode.getElementsByTagName("input")[0].value;
    //selects: button.td.tr.previousTablerow.td at index 0.innerhtml = userID.
    let userID = button.parentNode.parentNode.previousSibling.getElementsByTagName("td")[0].innerHTML;  
    let data = {UserID: userID, money: moneyDelta, reason: "Admin"};
    $.ajax({
        type: "POST",
        url: "./inc/serviceHandler.php",
        data: JSON.stringify(data),
        cache: false,
        dataType: "json",
        success: function() {
            let successBanner = document.getElementsByName("successBanner")[0]
            if (successBanner != null) {
                successBanner.remove();
            }
            let banner = document.createElement("td");
            banner.setAttribute("colspan", "4");
            banner.setAttribute("name", "successBanner");
            banner.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">'+
            '<strong>Money added!</strong>'+
            '<button type="button" class="close" data-dismiss="alert" onclick="this.parentNode.parentNode.remove()" aria-label="Close">'+
            '<span aria-hidden="true">&times;</span></button></div>';
            // selects button.td.tr.table
            let tablerow = button.parentNode.parentNode;
            tablerow.appendChild(banner);

            let userMoney = button.parentNode.parentNode.previousSibling.childNodes[5].innerHTML;
            userMoney = Number(userMoney) + Number(moneyDelta);
            button.parentNode.parentNode.previousSibling.childNodes[5].innerHTML = userMoney;
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log ("ERROR! ", textStatus, errorThrown);
        }
    })
}

function buildMoneyAdminPage() {
    if (username === "admin" /*DEBUG --->*/|| username === "Adrian") {
        let main = document.getElementById("main");

        let h1 = document.createElement("h1");
        h1.innerHTML = "This is the Money Admin Site";
        main.appendChild(h1);

        let p = document.createElement("p");
        p.innerHTML = "Search for ID, Firstname or Lastname<br>";
        main.appendChild(p);

        let searchField = document.createElement("input");
        searchField.setAttribute("id", "searchInput");
        searchField.setAttribute("placeholder", "Search...");
        searchField.setAttribute("oninput", "searchUsers()");
        main.appendChild(searchField);
        
        let div = document.createElement("div");
        div.setAttribute("style", "overflow-x:auto");
        div.innerHTML = '<table class="table" id="MoneyAdminTable"><tr>' +
            tableHeader + '</tr></table>';
        main.appendChild(div);

        let messageDiv = document.createElement("div");
        messageDiv.setAttribute("id", "testField");
        main.appendChild(messageDiv);
    }
    else {
        let main = document.getElementById("main");
        let h1 = document.createElement("h1");
        h1.innerHTML = "Sorry, you have no permission to be here.";
        main.appendChild(h1);

        let p = document.createElement("p");
        p.innerHTML = "Please leave before we have to call Security.<br>";
        main.appendChild(p);
    }
}