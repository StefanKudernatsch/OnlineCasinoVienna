var deck = new Array(52);

function printdeck(deck)
{
    for (var card = 0; card < 52; card++) {
        $("#images").append(deck[card]);
    }
}
$(document).ready(function () {

    // Fill deck
    for (var card = 0; card < 52; card++) {
        newcard = document.createElement("img");
        newcard.setAttribute("id", card + 1);
        newcard.setAttribute("src", "../res/img/karten/" + card + ".png");
        deck[card] = newcard;
        newcard.setAttribute("alt", "card" + card);
        //$("#images").append(newcard); old test
    }

    printdeck(deck);

});


