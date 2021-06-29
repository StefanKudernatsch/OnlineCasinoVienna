let user = [];
let username;
let selected;
var deck = [];
var playerhand = [];
var dealerhand = [];
var swapCards = [];
let pot = 0;
let playerbet = 0;
let dealerbet = 0;
let playerbudget = 0;
let gamerunning = false;
let rounds = 0;
var PlayerHand = new Array(); //bj
var DealerHand = new Array();
var taken = new Array();
let tempCardValue;
var tableHeader = "<tr><th>ID</th><th>Username</th><th>Firstname</th><th>Lastname</th><th>Email</th><th>Money</th></tr>";

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

        if(username === "admin") {
            window.location.href = "?page=home";
        }

        if(username !== undefined){
            
            getUserMoney(username);
            $('#startModal').modal({backdrop: 'static', keyboard: false})
            $("#startModal").modal('show');
            StartModal();
            document.getElementById("game-button-1").setAttribute("onclick", "bj_hit('playerhand', PlayerHand, taken, DealerHand)");
            document.getElementById("game-button-1").textContent = "Hit";
            document.getElementById("game-button-2").setAttribute("onclick", "bj_stand(DealerHand, PlayerHand, taken)");
            document.getElementById("game-button-2").textContent = "Stand";
            document.getElementById("game-button-3").remove();
            /*
            document.getElementById("game-button-3").setAttribute("onclick", "BJDoubleDown()");
            document.getElementById("game-button-3-full").textContent = "Double Down";
            document.getElementById("game-button-3-short").textContent = "DD";
             */
            document.getElementById("game-button-4").setAttribute("onclick", "surrenderBJ()");
            document.getElementById("game-button-4-full").textContent = "Surrender";
            document.getElementById("game-button-4-short").textContent = "Surr";
            document.getElementById("content").className = "deck";
            resizeMain();
            document.getElementById("main").className = "main";
            window.addEventListener('resize', resizeMain);
            //resetTaken(taken);
            //disableGameButtons();
        }
    }
    else if(window.location.search === "?page=TexasHoldem" || window.location.search === "?page=FiveCardDraw") {

        if(username === "admin") {
            window.location.href = "?page=home";
        }

        if(username !== undefined){
            StartModal();
            document.getElementById("game-button-1").setAttribute("onclick", "PokerCall()");
            document.getElementById("game-button-1").textContent = "Call";
            document.getElementById("game-button-3").setAttribute("onclick", "RaiseModal()");
            document.getElementById("game-button-3-full").textContent = "Raise";
            document.getElementById("game-button-3-short").textContent = "Raise";
            document.getElementById("game-button-4").setAttribute("onclick", "PokerFold()");
            document.getElementById("game-button-4-full").textContent = "Fold";
            document.getElementById("game-button-4-short").textContent = "Fold";

            if(window.location.search === "?page=TexasHoldem") {
                document.getElementById("game-button-2").remove();

            } else if(window.location.search === "?page=FiveCardDraw") {
                document.getElementById("game-button-2").setAttribute("onclick", "swapCard()");
                document.getElementById("game-button-2").textContent = "Draw";
            }

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

    $("a").click(function(){
        if(this.id !== document.getElementById("user_dropdown").id) {
            if(gamerunning && !confirm("Spiel beenden?")) {
                return false;
            }
        }
    });
});

function submitRaise(){
    getUserMoney(username);
    if(  $("#InputRaise").val() !== "" && $("#InputRaise").val() > 0 && $("#InputRaise").val() <= playerbudget){
        $("#raiseModal").modal('hide');
        pot = parseInt(pot) + parseInt($("#InputRaise").val());
        playerbet = parseInt(playerbet) + parseInt($("#InputRaise").val());
        removeMoney($("#InputRaise").val());
        $("#pot").html(pot);
        $("#InputRaise").val("");

        if(dealerbet < playerbet) {
            pot = parseInt(pot) + (playerbet - dealerbet);
            dealerbet = playerbet;
            $("#pot").html(pot);
            console.log("Dealer called");
        }

        /*
        if (window.location.search !== "?page=FiveCardDraw") {FCDDealerMove();}
        else if(window.location.search === "?page=TexasHoldem") {THDealerMove();}
         */
    }
}

function dealerRaise(amount){
    pot = parseInt(pot) + parseInt(amount);
    $("#pot").html(pot);
    dealerbet = parseInt(dealerbet) + parseInt(amount);
}

function checkInput() {
    getUserMoney(username);
    if($("#InputBet").val() >= 10 && $("#InputBet").val() <= playerbudget){
        $("#startModal").modal('hide');
        pot = $("#InputBet").val();
        playerbet = $("#InputBet").val();
        removeMoney(playerbet);
        $("#InputBet").val("");
        $("#pot").html(pot);
        rounds = 0;
        gamerunning = true;

        if(window.location.search === "?page=BlackJack") {
            $("#startModal").modal('hide');
            playBlackJack();
        }
        else if(window.location.search === "?page=TexasHoldem"){
            playTexasHoldem();
        }
        else if(window.location.search === "?page=FiveCardDraw"){
            playFiveCardDraw();
        }
    }
}

function getUserMoney(user){
    $.ajax
    ({
        type: "GET",
        url: "./inc/serviceHandler.php",
        data: {method: "getMoneyWithName", param: user},
        cache: false,
        dataType: "json",
        success: function (data) {
            playerbudget = data;
            $("#userMoney").html(playerbudget + '&nbsp<i class="fas fa-euro-sign"></i>');
        },
        error: function (request, status, error) {
            alert("Failed to get Money");
        }
    });
}

function RaiseModal(){
    $("#raiseModal").modal('show');
}

function StartModal() {
    getUserMoney(username);
    $("#endModal").modal('hide');
    $('#startModal').modal({backdrop: 'static', keyboard: false})
    $("#startModal").modal('show');
    enableGameButtons(1);
}

function EndModal(Title, BodyText) {
    $("#endTitle").html(Title);
    $("#endText").html(BodyText);
    $('#endModal').modal({backdrop: 'static', keyboard: false})
    $("#endModal").modal('show');
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

function showDealerCards() {
    disableGameButtons();
    let div = document.getElementById("dealerhand");
    let children = div.children;

    for (let i = 0; i < children.length; i++) {
        let child = children[i];
        child.src = "res/img/cards/current/" + dealerhand[i] +".png";
    }
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
    //console.log(div1.clientWidth);
    let count = div1.childElementCount;


    let main_padding = parseInt(window.getComputedStyle(main, null).getPropertyValue('padding'), 10);
    //console.log("max:"+main_padding);
    let screenwidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    let x = main.clientWidth/2 - main_padding - (div.clientWidth/2) - 10 + (count * ((div.clientWidth/2)+5));

    if(screenwidth < 768){
        x += 5;
    }
    let children = div1.children;


    for (let i = 0; i < children.length; i++) {
        let child = children[i];
        //console.log("Xasd " + child.offsetLeft);
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

    //console.log("X " + x);

    //console.log("Wdidht " + screenwidth);
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

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function createDeck(deckamounts) {
    deck = new Array(deckamounts * 52);
    for (let i = 0; i < deck.length; i++) {
        deck[i] = i % 52;
    }
}

function getCard(hand,open) {
    let randomCardIndex = getRandomInt(deck.length);
    switch (hand) {
        case 'dealerhand': {
            dealerhand.push(deck[randomCardIndex]);
            drawCard(hand,deck[randomCardIndex],open);
            break;
        }
        case 'playerhand': {
            playerhand.push(deck[randomCardIndex]);
            drawCard(hand,deck[randomCardIndex],open);
            break;
        }
        case 'middlehand': {
            dealerhand.push(deck[randomCardIndex]);
            playerhand.push(deck[randomCardIndex]);
            drawCommunityCard(deck[randomCardIndex]);
            break;
        }
    }

    //console.log(cardIndex + ": " + deck[cardIndex]);
    deck.splice(randomCardIndex,1);
}

function bj_pushcard(destination, hand, taken, Card, open) {
    console.log("Pushing Card Num: " + Card);
    hand.push(Card); // Add card to hand
    taken[Card] = true; // Set card taken
    // Display Card on Hand Function here
    bj_getCard(destination,Card, open);
}

function bj_pullcard(destination, hand, taken, open) {
    var pull;
    do {
        pull = Math.floor(Math.random() * 52);
        console.log(pull);     // returns a random integer from 0 to 51
    } while (taken[pull]); // Try to pull card that is not taken
    bj_pushcard(destination, hand, taken, pull, open); // Push the Card into the Hand
}

function bj_calcHandValue(hand) {
    var valuelow = 0;
    var valuehigh = 0;

    if (hand.length == 0) {
        console.log("Hand empty");
    }
    else {
        hand.forEach(element => {
            //console.log("Element: " + element);
            var rest = parseInt((element+1) / 13); // because it ends as float
            //console.log("rest: " + rest);
            if (rest > 0) {
                var value = element - (13 * rest) + 1;
                //console.log(value + " = " + element + " - 13 * " + rest + " + 1");
            }
            else {
                var value = element+1;
            }
            console.log("Value: " + value);

            if (value == 1) {
                valuelow += 1; // Ace either 1 or 11
                valuehigh += 11;
            }
            else if (value > 9 || value == 0) {
                valuelow += 10; // 10+ Cards
                valuehigh += 10;
            }
            else if (value > 1 && value < 10) {
                valuelow += value; // 1-9 Cards
                valuehigh += value;
            }
        });
    }

    var numbers = {
        low: valuelow,
        high: valuehigh,

        bj_isBust: function () {
            console.log("isBust(): " + valuelow);
            if (parseInt(valuelow) > 21) {
                return true; // Busted
            }
            return false;
        },
        bj_hasWon: function () {
            if (valuelow == 21 || valuehigh == 21) {
                return true;
            }
            return false;
        }
    };
    //console.log(numbers);

    return numbers;

}

function bj_hit(destination, PlayerHand, taken, DealerHand) {

    bj_pullcard(destination, PlayerHand, taken);
    var values = bj_calcHandValue(PlayerHand);
    var bust = values.bj_isBust();
    console.log(bust);
    if (bust) {
        //End game
        console.log("Busted");
        disableGameButtons();
        EndModal("Verloren", "Du bist über 21 gekommen");
    }
    var won = values.bj_hasWon()
    if (won) {
        // Dealer?
        bj_dealer(DealerHand, PlayerHand, taken);
    }

}

function bj_dealerhit(DealerHand, taken) {
    bj_pullcard(DealerHand, taken);
    var values = bj_calcHandValue(DealerHand); 
    var bust = values.isBust();

    if (bust) {
        //End game
        console.log("Busted");
        disableGameButtons();
        EndModal("Gewonnen", "Dealer ist über 21 gekommen");
        return false;
    }
    return true;
}

function bj_dealer(DealerHand, PlayerHand, taken) {
    disableGameButtons();
    var values = bj_calcHandValue(DealerHand, taken);
    var own = bj_calcHandValue(PlayerHand, taken);
    setTimeout(function() {

        if (!values.bj_isBust() 
        && (!(values.low > own.low && values.low > own.high || (values.high > own.low && values.high > own.high)) 
        && (values.low != 21 || values.high != 21) 
        && !(values.low >= 17))) { 
            bj_pullcard("dealerhand", DealerHand, taken, true);
            values = bj_calcHandValue(DealerHand, taken);          
            bj_dealer(DealerHand, PlayerHand, taken); // Recursive instead of using a loop to have animations with delay
        }
        else
        {
            disableGameButtons();
                if (values.bj_hasWon() && own.bj_hasWon() || values.low === own.low && values.high === own.high)
                {
                   // Draw
                   console.log("Draw");
                   // Modal, both money back
                   // Play again?
                   // Reset game
                   addMoney(pot);
                   EndModal("Unentschieden", "Dealer und Du sind gleich hoch");
                }
                else if(values.low > 21 || values.high < own.high)
                {
                    console.log("Dealer lost, you win");
                    // Modal, win
                    addMoney(pot*2);
                    EndModal("Gewonnen", "Dealer ist über 21");
                }
                else if (values.low > own.low && values.low > own.high || ((values.high > own.low  && values.high > own.high) && values.high <=21))
                {
                    // Lose game
                    console.log("Lost. Dealer higher than you.");
                    // Play again?
                    // Reset game
                    console.log(username);
                    EndModal("Verloren", "Dealer ist höher");
                }
                else
                {
                    console.log("Dealer lost, you win");
                    // Modal, win
                    addMoney(pot*2);
                    EndModal("Gewonnen", "Du hast gewonnen");
                }
            }
      }, 1000)
}

function bj_stand(DealerHand, PlayerHand, taken) {
    // Disable buttons
    disableGameButtons()
    // Show card
    console.log("calculating dealerhand");
    var values = bj_calcHandValue(DealerHand, taken);
    console.log("calculating playerhand");
    var own = bj_calcHandValue(PlayerHand, taken);
    console.log("Dealer low: " + values.low + " Dealer high: " + values.high);
    bj_dealer(DealerHand, PlayerHand, taken);
}

function resetTaken(taken) {
    // Set Taken to false by default
    for (var bool = 0; bool < 52; bool++) {taken[bool] = false;}
}

function disableGameButtons() {
    $("#game-button-1").prop('disabled', true);
    $("#game-button-2").prop('disabled', true);
    $("#game-button-3").prop('disabled', true);
    $("#game-button-4").prop('disabled', true);
}

function enableGameButtons(timeout) {
    setTimeout(function (){$('#game-button-1').prop('disabled', false);}, timeout);
    setTimeout(function (){$('#game-button-2').prop('disabled', false);}, timeout);
    setTimeout(function (){$('#game-button-3').prop('disabled', false);}, timeout);
    setTimeout(function (){$('#game-button-4').prop('disabled', false);}, timeout);
}

function bj_getCard(destination, pos, open) {
    console.log("getcard");
    switch (destination) {
        case 'dealerhand': {
            console.log("drawing dealer card");
            drawCard(destination,pos,open);
            break;
        }
        case 'playerhand': {
            console.log("drawing player card");
            drawCard(destination,pos,open);
            break;
        }
    }
}

function playFiveCardDraw() {
    createDeck(1);
    disableGameButtons();
    let cards = document.getElementById("playerhand").childNodes;
    for (let i = 0; i < cards.length; i++) {cards[i].remove();}

    setTimeout(function () {getCard("dealerhand", false);}, 1000);
    setTimeout(function () {getCard("playerhand", true);}, 2000);
    setTimeout(function () {getCard("dealerhand", false);}, 3000);
    setTimeout(function () {getCard("playerhand", true);}, 4000);
    setTimeout(function () {getCard("dealerhand", false);}, 5000);
    setTimeout(function () {getCard("playerhand", true);}, 6000);
    setTimeout(function () {getCard("dealerhand", false);}, 7000);
    setTimeout(function () {getCard("playerhand", true);}, 8000);
    setTimeout(function () {getCard("dealerhand", false);}, 9000);
    setTimeout(function () {getCard("playerhand", true);}, 10000);
    enableGameButtons(11000);
    $("#game-button-2").prop('disabled', true);
}

function playTexasHoldem() {
    createDeck(1);
    disableGameButtons();
    setTimeout(function () {getCard("dealerhand", false);}, 1000);
    setTimeout(function () {getCard("playerhand", true);}, 2000);
    setTimeout(function () {getCard("dealerhand", false);}, 3000);
    setTimeout(function () {getCard("playerhand", true);}, 4000);
    enableGameButtons(5000);
}

function playBlackJack() {
    createDeck(1);
    disableGameButtons();
    setTimeout(function(){ bj_pullcard("dealerhand", DealerHand, taken, true)}, 2000);
    setTimeout(function(){ bj_pullcard("playerhand", PlayerHand, taken, true)}, 3000);
    setTimeout(function(){ bj_pullcard("playerhand", PlayerHand, taken, true)}, 4000);
    setTimeout(function(){
        var values = bj_calcHandValue(PlayerHand);
        var won = values.bj_hasWon()
        if (won) {
            // Pulled a blackjack first
            bj_dealer(DealerHand, PlayerHand, taken);
        }
        else {enableGameButtons(1);}
    }, 5000);
}

function PokerCall() {
    console.log("Player called");
    getUserMoney(username);
    console.log(playerbet);

    if(playerbet < dealerbet && playerbudget >= dealerbet - playerbet) {
        //take player money
        pot = parseInt(pot) + (dealerbet - playerbet);
        removeMoney((dealerbet - playerbet));
        playerbet = parseInt(playerbet) + (dealerbet - playerbet);
        $("#pot").html(pot.toString());
    }

    if(dealerbet < playerbet) {
        pot = parseInt(pot) + (playerbet - dealerbet);
        dealerbet = playerbet;
        $("#pot").html(pot);
        console.log("Dealer called");
    }

    if(playerbet === dealerbet) {
        if(window.location.search === "?page=FiveCardDraw") {FCDDealerMove();}
        else if(window.location.search === "?page=TexasHoldem") {THDealerMove();}
    }
}


/*

function fcd_calculateHand(hand) {
    // give every possible combination one unique (!) number.

    // Hand sortieren aufsteigend
    hand.sort(function(a, b){return a-b})

    // four royal flushes ... kann ich noch umschreiben. hand sortieren und nur ersten und letzten wert prüfen
    // return points = 1000
    if (hand[0] == 26 && hand[1] == 35 && hand[4] == 38) return 1000;
    //if (hand.find(value => value == 26 ) && hand.find(value => value == 35 ) && hand.find(value => value == 36 ) 
    //    && hand.find(value => value == 37 ) && hand.find(value => value == 38)) return 1000;
    else if (hand.find(value => value == 13 ) && hand.find(value => value == 25 ) && hand.find(value => value == 24 ) 
        && hand.find(value => value == 23 ) && hand.find(value => value == 22)) return 1000;
    else if (hand.find(value => value == 39 ) && hand.find(value => value == 51 ) && hand.find(value => value == 50 ) 
        && hand.find(value => value == 49 ) && hand.find(value => value == 48)) return 1000;
    else if (hand.find(value => value == 0 ) && hand.find(value => value == 12 ) && hand.find(value => value == 11 ) 
        && hand.find(value => value == 10 ) && hand.find(value => value == 9)) return 1000;
    
    // Straight flushes
    if (hand[0] >= 0 && hand[4] <= 12 || hand[0] >= 13 && hand[4] <= 25 || hand[0] >= 26 && hand[4] <= 38 || hand[0] >= 39 && hand[4] <= 51) {
        //all cards are of the same color

        if (hand[0] % 13 == 0) { //try with ace at the end of the straight
            if (hand[1] % 13 == 9 && hand[4] % 13 == 12 ) {
                console.log("Straight Flush! Hand: " + hand);
                return 900 + 13; //add the highest card to the return score (in this case Ace = 13).
            }
        } else if (hand[0] + 4 == hand[4]) {
            console.log("Straight Flush! Hand: " + hand);
            return 900 + hand[4] % 13; //all in order, ace maybe at the start of the straight. Add the highest card to the return score
        }
    }

    //hand[] in modulohand[] kopieren
    let moduloHand = [];
    for (let i = 0; i < hand.length; i++) {
        moduloHand[i] = hand[i];
    }

    // Pairs, Trips, Quads etc zählen (auch für Full House)
    // alles modolo rechen und zählen wie oft die gleiche Zahl drinnen ist
    for (let i = 0; i < moduloHand.length; i++) {
        moduloHand[i] = moduloHand[i] % 13;

    }
    let counts = {}
    for (let i = 0; i < moduloHand.length; i++) {
        if (counts[moduloHand[i]]) {
            counts[moduloHand[i]] += 1;
        } else {
            counts[moduloHand[i]] = 1;
        }
    }
    moduloHand.sort(function(a, b){return a-b})

    // Quads
    // search in counts{} if one card was counted 4 times
    for (let i = 0; i < moduloHand.length; i++) {
        if (counts[moduloHand[i]] == 4) {
        console.log("Quads! Hand: " + hand);
            if (moduloHand[i] == 0) //Ace is highest card
                return 800 + 13;
            else
                return 800 + moduloHand[i];
        }
    }

    // Full House
    for (let i = 0; i < moduloHand.length; i++) {
        if (counts[moduloHand[i]] == 3) { // Search for Trips
            for (let j = 0; j < moduloHand.length; j++) {
                if (counts[moduloHand[j]] == 2) { // Search for pairs
                    console.log("Full House! Hand: " + hand)
                    if (moduloHand[i] == 0) // Ace is highest card
                        return 700 + 13;
                    else
                        return 700 + moduloHand[i];
                }
            }
            //console.log("valuecard: " +(cards[i] % 13 + 1)+ " visited "+visited[(cards[i] % 13)]);
        }
    }

    // Flushes
    if ((hand[0] >= 0 && hand[4] <= 12) || (hand[0] >= 13 && hand[4] <= 25) ||  
    (hand[0] >= 26 && hand[4] <= 38) || (hand[0] >= 39 && hand[4] <= 51)) {
        console.log("Flush! Hand: " + hand);
        if (hand[4] % 13 == 0) 
            return 600 + 13;
        else 
            return 600 + hand[4] % 13;
    }

    // Straight = return 500 - 513
    if (moduloHand[0] % 13 == 0) { // At least one ace is in the hand
        if (moduloHand[1] % 13 == 9 && moduloHand[4] % 13 == 12 ) { //try with ace at the end of the straight
            console.log("Straight! Hand: " + hand);
            return 500 + 13; //add the highest card to the return score (in this case Ace = 13).
        } else if (moduloHand[1] % 13 == 1 && moduloHand[4] % 13 == 4) { // try with ace at the beginning of the straight
            console.log("Straight! Hand: " + hand);
            return 500 + moduloHand[4];
        }
    } else if (moduloHand[0] + 4 == moduloHand[4]) { // no ace but straight
        console.log("Straight! Hand: " + hand);
        return 500 + moduloHand[4] % 13; //all in order, no ace in the straight. Add the highest card to the return score
    }

    // Trips
    // search in counts{} if one card was counted 3 times
    for (let i = 0; i < moduloHand.length; i++) {
        if (counts[moduloHand[i]] == 3) {
        console.log("Trips! Hand: " + hand);
            if (moduloHand[i] == 0) //Ace is highest card
                return 400 + 13;
            else
                return 400 + moduloHand[i];
        }
    }

    //Two Pairs
    for (let i = 0; i < moduloHand.length; i++) {
        if (counts[moduloHand[i]] == 2) { // Search for first pair
            for (let j = 0; j < moduloHand.length; j++) {
                if (moduloHand[i] != moduloHand[j]) {
                    if (counts[moduloHand[j]] == 2) { // Search for second pair
                        console.log("Two Pairs! Hand: " + hand);

                        if (moduloHand[i] == 0) // Ace is highest card
                            return 300 + 13;
                        else
                            return 300 + moduloHand[i];
                    }
                }  
            }
        }
    }

    // Pair
    for (let i = 0; i < moduloHand.length; i++) {
        if (counts[moduloHand[i]] == 2) {
            console.log("Pairs! Hand: " + hand);
            if (moduloHand[i] == 0) //Ace is highest card
                return 200 + 13;
            else
                return 200 + moduloHand[i];
        }
    }

    // Highest Card
    console.log("Highest Card! Hand: " + hand);
    if (moduloHand[0] % 13 == 0) {
        return 100 + 13;
    } else {
        return 100 + moduloHand[4];
    }
}*/




function selectCard(card){
    if((swapCards.find(element => element === card) !== undefined)){
        console.log("Index of Card" + swapCards.indexOf(card));
        swapCards.splice(swapCards.indexOf(card),1);
        setTimeout(function() {
            card.style.transitionDuration = '0.2s';
            card.style.transform = '';
        },200);
    } else {
        swapCards.push(card);
        setTimeout(function () {
            card.style.transitionDuration = '0.2s'
            card.style.transform = 'translateY(20px)';
        }, 200);
    }
}

function swapCard() {
    for(let i = 0; i < swapCards.length; i++) {
        let cardValue = swapCards[i].getAttribute("src");
        cardValue = cardValue.slice(22);
        cardValue = cardValue.substr(0, cardValue.length - 4);
        cardValue = parseInt(cardValue);
        swapCards[i].remove();
        playerhand.splice(playerhand.indexOf(cardValue), 1);
        setTimeout(function () {getCard("playerhand", true);}, ((i + 1) * 1000));
    }
    $("#game-button-2").prop('disabled', true);
    $("#game-button-3").prop('disabled', false);
}

function PokerFold() {
    if(confirm("Fold Cards?")){
        gamerunning = false;
        endGame();
    }
}

function surrenderBJ(){
    if(confirm("Surrender?")){
        addMoney(playerbet/2);
        gamerunning = false;
        endGame();
    }
}

function FCDDealerMove() {
    console.log("round: " , rounds);
    switch (rounds) {
        case 0: { //prepare for next round which is the card-swapping round
            console.log("Card-swapping round");

            //give cards a onclick event
            let cards = document.getElementById("playerhand").childNodes;

            for (let i = 0; i < cards.length; i++) {
                console.log("Playerhand" + cards[i]); //<--- !!!!!!!!!!!!!!!!!!!
                cards[i].setAttribute("onClick", "selectCard(this)");
            }
            //disable raise button
            document.getElementById("game-button-3").disabled = true;

            break;
        }
        case 1: { //prepare for next round which is the secont bet round
            console.log("Second Bet Round");


            for(let i = 0; i < playerhand.length; i++){
                console.log("PlayerHandElement " + i + " = " + playerhand[i]);
            }

            //remove onClick event from the cards
            let cards = document.getElementById("playerhand").childNodes;
            for (let i = 0; i < cards.length; i++) {
                cards[i].setAttribute("onClick", "");
            }

            //activate raise button
            document.getElementById("game-button-3").disabled = false;
            break;
        }
        case 2: {

            //showdown

            showDealerCards();
            /*
            console.log("Showdown");
            console.log(username);
            let playerPoints = fcd_calculateHand(playerhand);
            console.log("Playerhand points: " + playerPoints);
            let dealerPoints = fcd_calculateHand(dealerhand);

            let message = "";
            if (playerPoints > dealerPoints) {
                //Player wins. So he gets twice the pot, since the dealer never put money in the pot right?
                message = "You won!";
                addMoney(pot * 2);
            } else if (playerPoints < dealerPoints) {
                //Dealer wins
                message = "Dealer won.";
            } else {
                //Pot gets split. So Player gets the pot back e.g. all of his bets.
                message = "Tie! Pot gets split!"
            }
            alert(message + " \nYour Hand: " + playerhand + "\nDealer Hand: " + dealerhand);
            //endGame();

*/
            setTimeout(function () {comparePokerhand()}, 2000);
            break;
        }
    }
    rounds++;
}

function THDealerMove() {
    console.log("rounds: " , rounds);
    disableGameButtons()
    //if(dealerbet === playerbet) {
        switch (rounds) {
            case 0: {
                setTimeout(function () {getCard("middlehand", true);}, 1000);
                setTimeout(function () {getCard("middlehand", true);}, 2000);
                setTimeout(function () {getCard("middlehand", true);}, 3000);
                enableGameButtons(4000);
                break;
            }
            case 1: {
                //dealerRaise(50);
                setTimeout(function () {getCard("middlehand", true);}, 1000);
                enableGameButtons(2000);
                break;
            }
            case 2: {
                setTimeout(function () {getCard("middlehand", true);}, 1000);
                enableGameButtons(2000);
                break;
            }
            case 3: {
                showDealerCards();
                setTimeout(function () {comparePokerhand()}, 2000);
                enableGameButtons(2001);
                break;
            }
        }
        rounds++;
    //}
}

function comparePokerhand() {
    let dealerpoints = calculatePokerhand("dealerhand");
    let playerpoints = calculatePokerhand("playerhand");
    let endString = "";
    let title;
    console.log("dealer: " + dealerpoints);
    console.log("player: " + playerpoints);

    if(dealerpoints > playerpoints) {
        //LOST
        title = "You LOST!"
        endString = printPoints(dealerpoints,endString);
        endString += " beats your ";
        endString = printPoints(playerpoints,endString);
    } else if(playerpoints > dealerpoints){
        title = "You WON!";
        endString = printPoints(playerpoints,endString);
        endString += " beats dealers ";
        endString = printPoints(dealerpoints,endString);
        addMoney(pot);
    } else {
        title = "It's a DRAW!";
        endString = printPoints(dealerpoints,endString);
        endString += " same as ";
        endString = printPoints(playerpoints,endString);
        addMoney(playerbet);
    }
    EndModal(title,endString);
}

function printPoints(points,endString) {
    if(points === 660) {endString += "Royal Flush";}
    else if(points < 660 && points >= 615) {endString += "Straight Flush";}
    else if(points <= 556 && points >= 508) {endString += "Four of a kind";}
    else if(points <= 468 && points >= 412) {endString += "Full house";}
    else if(points === 300) {endString += "Flush";}
    else if(points <= 260 && points >= 215) {endString += "Straight";}
    else if(points <= 192 && points >= 156) {endString += "Three of a kind";}
    else if(points <= 128 && points >= 106) {endString += "Two pair";}
    else if(points <= 38 && points >= 14) {endString += "Pair";}
    else {endString += "High Card";}
    return endString;
}

function calculatePokerhand(hand) {
    var cards;
    let pair = false;
    let twopair = false;
    let flush = false;
    let straight = false;
    let straightflushed = false;
    let threeofakind = false;
    let fourofakind = false;
    let straightcounter = 0;
    let points = 0;
    let highcard = 0;


    let color = [];
    color[0] = 0;
    color[1] = 0;
    color[2] = 0;
    color[3] = 0;
    let straightflush = [];
    straightflush[0] = 0;
    straightflush[1] = 0;
    straightflush[2] = 0;
    straightflush[3] = 0;
    let visited = new Array(13);

    if(hand === "dealerhand") {
        cards = dealerhand;
    } else if(hand === "playerhand") {
        cards = playerhand;
    }

    if(cards.length === 7) {
        if((cards[0] % 13) === 0 || (cards[1] % 13) === 0) {
            highcard = 13;
        } else if((cards[0] % 13) >= (cards[1] % 13)) {
            highcard = (cards[0] % 13);
        } else {
            highcard = (cards[1] % 13);
        }
    } else {
        for (let i = 0; i < cards.length; i++) {
            if(cards[i] % 13 === 0) {
                highcard = 13;
                break;
            } else if(cards[i] % 13 > highcard && cards[i] % 13 !== 0) {
                highcard = cards[i] % 13;
            }
        }
    }
    console.log("highcard: " + highcard);

    cards.sort(function(a, b){return b-a}); //sort cardvalues descending

    for (let i = 0; i < cards.length; i++) {

        if(cards[i] >= 0 && cards[i] <= 12) {
            //clubs
            color[0]++;
        } else if(cards[i] >= 13 && cards[i] <= 25) {
            //diamonds
            color[1]++;
        } else if(cards[i] >= 26 && cards[i] <= 38) {
            //hearts
            color[2]++;
        } else if(cards[i] >= 39 && cards[i] <= 51) {
            //spades
            color[3]++;
        }

        //card sort % 13
        if(visited[(cards[i] % 13)] === undefined) {
            visited[(cards[i] % 13)] = 1;
            //sortier array
            //geh durch ob aufeinanderfolgend
            for (let j = i + 1; j < cards.length; j++) {
                if ((cards[i] % 13) === (cards[j] % 13)) {
                    visited[(cards[i] % 13)] += 1;
                }
            }
        }
    }

    //cards.length
    for (let i = cards.length-1; i >= 0; i--) {
        if ((cards[i] >= 0 && cards[i] <= 12) && (cards[i - 1] >= 0 && cards[i - 1] <= 12)) {
            //clubs
            straightflush[0]++;
        } else if ((cards[i] >= 13 && cards[i] <= 25) && (cards[i - 1] >= 13 && cards[i - 1] <= 25)) {
            //diamonds
            straightflush[1]++;
        } else if ((cards[i] >= 26 && cards[i] <= 38) && (cards[i - 1] >= 26 && cards[i - 1] <= 38)) {
            //hearts
            straightflush[2]++;
        } else if ((cards[i] >= 39 && cards[i] <= 51) && (cards[i - 1] >= 39 && cards[i - 1] <= 51)) {
            //spades
            straightflush[3]++;
        }
    }

    //check if flush and  straight
    for (let i = 0; i < straightflush.length; i++) {
        if(straightflush[i] === 4) {
            straightflushed = true;
            break;
        }
    }

    //check if straight
    if(visited[12] >= 1 && visited[0] >= 1) {
        straightcounter++;
        points = 14;
    }

    for (let i = (visited.length - 1); i >= 0; i--) {
        if(straightcounter === 4) {
            points += (i+1) + 200;
            straight = true;
            break;
        }
        if(visited[i] >= 1 && visited[i-1] >= 1) {
            straightcounter++;
            points += (i+1);
        } else {
            straightcounter = 0;
            points = 0;
        }
    }

    //check if straightflush
    if(straightflushed && straight) {points += 400}

    //check if flush
    for(let i = 0; i < color.length; i++) {
        if(color[i] >= 5) {
            if(points < 300) {points = 300;}
            flush = true;
            break;
        }
    }

    //check amount of aces
    switch (visited[0]) {
        case 2: {
            if((14 * 2 + 10) >= points) {points = 14 * 2 + 10;}
            pair = true;
            break;
        }
        case 3: {
            if((14 * 3 + 150) >= points) {points = 14 * 3 + 150;}
            threeofakind = true;
            break;
        }
        case 4: {
            if((14 * 4 + 500) >= points) {points = 14 * 4 + 500;}
            fourofakind = true;
            break;
        }
    }

    let bufferpoints = points;

    //check amount of every card
    for (let i = visited.length - 1; i >= 1; i--) {
        console.log("card " + i + ": " + visited[i]);
        switch (visited[i]) {
            case 2: {
                if (twopair || threeofakind || fourofakind || straight || flush) {
                    if(threeofakind) {points += 240;}
                    break;
                } else if (pair) {
                    points += 90;
                    twopair = true;
                } else {
                    if(bufferpoints + (i + 1) * 2 + 10 > points) {points = bufferpoints + (i + 1) * 2 + 10;}
                    pair = true;
                }
                break;
            }
            case 3: {
                if (threeofakind || fourofakind || straight || flush) {break;}
                else if (twopair) {points += 300 + 3 * (i+1);}
                else if (pair) {points += 390 + 3 * (i+1);}
                else {
                    if(bufferpoints + 3 * (i+1) + 150 > points) {points = bufferpoints + 3 * (i+1) + 150;}
                }
                threeofakind = true;
                break;
            }
            case 4: {
                if(bufferpoints + 4 * (i+1) + 500 > points) {points = bufferpoints + 4 * (i+1) + 500;}
                fourofakind = true;
                break;
            }
            default: {break;}
        }
    }

    console.log("points: " + points);
    if(points === 0) {points = highcard;}
    return points;
}

function endGame() {
    $("#pot").html("0");
    deck = [];
    playerhand = [];
    dealerhand = [];
    swapCards = [];
    pot = 0;
    playerbet = 0;
    dealerbet = 0;
    rounds = 0;
    PlayerHand.splice(0, PlayerHand.length);
    DealerHand.splice(0, DealerHand.length);
    resetTaken(taken);

    while(document.getElementById("playerhand").firstChild) {document.getElementById("playerhand").removeChild(document.getElementById("playerhand").firstChild);}
    while(document.getElementById("dealerhand").firstChild) {document.getElementById("dealerhand").removeChild(document.getElementById("dealerhand").firstChild);}
    while(document.getElementById("middlehand").firstChild) {document.getElementById("middlehand").removeChild(document.getElementById("middlehand").firstChild);}

    StartModal();
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
    $("#save-edit-user").html("Einstellungen speichern");
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

    $.ajax({
        type: "POST",
        url: "./inc/serviceHandler.php",
        data: JSON.stringify(data),
        cache: false,
        dataType: "json",
        success: function () {
            $(".form-control").prop("readonly",true);
            $(".form-select").prop("disabled",true);
            $("#save-edit-user").html("Einstellungen ändern");
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
            console.log("Money removed!");
        },
        // error: function (request, status, error) {
        //    // alert("Error");
        // }
    });
}

function addMoney(money){
    console.log("AddMoney");
    var data = {
        userID: username,
        money: money
    }
    $.ajax({
        type: "POST",
        url: "./inc/serviceHandler.php",
        data: JSON.stringify(data),
        cache: false,
        dataType: "json",
        success: function (result) {
            console.log("money added! (?) ", result);
            getUserMoney(username);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Error Return from Ajax");
            alert(jqXHR.getResponseHeader('Content-Type'));
            console.log(jqXHR.responseText);
            console.log(jqXHR);
            console.log(errorThrown);
            console.log(textStatus);

            //https://stackoverflow.com/questions/27004477/ajax-json-parse-error-in-jquery
        }
    });
}

function changePassword(){
    let id = user[0];
    let old_password = document.getElementById("old_pw").value;
    let new_password = document.getElementById("new_pw").value;
    let data = {oldPW: old_password, newPW: new_password, ID: id};
    $.ajax({
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

function searchUsers() {
    let search = $("#searchInput").val();
    $.ajax({
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