
//TODO (maybe) (thanks peter ward) : 20% opacity sunshine thing behind gabe.
//TODO each click loads more images

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

    var startGabe = function () {
        console.log("ARE YOU READY FOR A MIRACLE? (starting rain)");

        // When the image of his holiness loads, show it and animate it.
        $('div.gag > img').load(function () {
            $(this).parent().show();
            $(this).parent().addClass('gag-animation');
        });

        var $saleBox = $('.sale-box');
        // How long in ms to wait until adding another sale box.
        var interval = 200;
        var numSales = 0;

        console.log("about to add sale")
        // Adds a sale box at a random x position.
        var addSale = function() {
            console.log("adding sale")

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
            console.log("finished adding sale")

    };

    //TODO: system requirements for these legit CSS animations

    // Set an interval to decrease the interval #inception
    window.setInterval(function() {
        interval = Math.max(10, interval - 10);
    }, 500);

    window.setTimeout(addSale, 2*1000);

    };

    // Only care about the first time we load the steam iframe, or else we keep adding sales
    // every time we navigate to a new steam link.
    var steamLoaded = false;
    var $steamFrame = $('iframe.steam')
    $steamFrame.load(function() {
        if (!steamLoaded) {
            console.log("Getting ready to start gabe...");
            steamLoaded = true; //programming

            // Resize the iframe to fullscreen at runtime in js oops someone fire me
            var height = $steamFrame.contents().height();
            var width = $steamFrame.contents().width();
            $steamFrame.height(height);
            $steamFrame.width(width);

            startGabe(); //programming
        }

    });


});



