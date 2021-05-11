let user = [];
let username;
let image_string;
$(document).ready(function () {
    if(window.location.search === "?page=UserForm") {
        setUserImg();
        loadProfile();
        
    }
    
});

function setUserImg(){
    document.getElementById("user[11]").src = 'data:image/png;base64,'+image_string;
}
function loadProfile() {

    console.log(username);
    $.ajax
    ({
        type: "GET",
        url: "./inc/serviceHandler.php",
        data: {method: "getUserWithName", param: username},
        cache: false,
        dataType: "json",
        success: function (data) {
            let i = 0;
            Object.keys(data).forEach(function (userkey) {
                user[i] = data[userkey];
                i++;
            });

            for (let j = 1; j < 12; j++) {
                if(j != 9) {
                    console.log("Userarray["+j+"]: "+user[j]);
                    document.getElementById("user["+j+"]").value = user[j];
                }
            }

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
    let username = $("#logged_user").text();
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