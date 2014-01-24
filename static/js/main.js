
//TODO (maybe) (thanks peter ward) : 20% opacity sunshine thing behind gabe.

$(function() {

    var pageWidth = $('body').width();
    // How many falling boxes we'll have at maximum gabeIntensity.
    var MAX_SALES = (pageWidth/70)*5;


    // The carefully, lovingly determined percentages which his holiness removes from the prices of his products.
    var STEAM_SALES = [10, 25, 33, 50, 66, 75, 80, 90]

    // lolsorandom
var randomChoice = function(list) {
            return list[Math.floor(Math.random()*list.length)]
    }

    var getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    var startRain = function () {

        // When the image of his holiness loads, show it and animate it.
        var $saleBox = $('.sale-box');
        // How long in ms to wait until adding another sale box.
        var interval = 200;
        var numSales = 0;

        // Adds a sale box at a random x position.
        var addSale = function() {

            var xPos = getRandomInt(0, pageWidth);
            var percentOff = randomChoice(STEAM_SALES);
            // Just copy the hidden box we had at page load time to make a new box.
            var newSale = $saleBox.clone().show();

            newSale.text("-" + percentOff + "%"); // >js >strings

            newSale.css("left", xPos);
            $('body').append(newSale);

            //Only have MAX_SALES sale boxes onscreen at once.
            if (numSales < MAX_SALES) {
                // Add a new sale box later.
                window.setTimeout(addSale, interval);
                numSales++;
            }

        };

        // Set an interval to decrease the interval #inception
        window.setInterval(function() {
            interval = Math.max(10, interval - 10);
        }, 500);

        window.setTimeout(addSale, 2*1000);

    };

    var startGabe = function() {
        $('div.gag').show();
        $('div.gag').addClass('gag-animation');
    }


    var praiseBeToGaben = function () {
        startGabe();
        startRain();
    }

    //TODO: system requirements for these legit CSS animations


    // Only care about the first time we load the steam iframe, or else we keep adding sales
    // every time we navigate to a new steam link.
    var steamLoaded = false;

    var $steamFrame = $('iframe.steam')

    $steamFrame.load(function() {
        if (steamLoaded) {
            return
        }
        steamLoaded = true; //programming
        $gabe = $('div.gag > img');
        //Even if we loaded from cache, praise be. Nothing can cache his holiness forever.
        if ($gabe[0].complete) {
            praiseBeToGaben()
        }
        else {
            $gabe.load(function () {
                praiseBeToGaben()
            });
        }
    });
});



