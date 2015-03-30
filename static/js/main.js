//TODO (maybe) (thanks peter ward) : 20% opacity sunshine thing behind gabe.
//TODO each click loads more images

$(function() {

    // We poll these variables while the wallet is being prepared
    var gabeReady = false;
    // also only care about the first time we load the steam iframe, or else we keep adding sales
    // every time we navigate to a new steam link.
    var iframeReady = false;
    var audioReady = false;

    // The carefully, lovingly determined percentages which his holiness removes from the prices of his products.
    var BEST_SCORES = [136, 161, 178, 116, 128, 186, 134, 103, 116, 216]
    var TEAMS = ["#FF0000", "#0000FF"]

    // lolsorandom
    var randomChoice = function(list) {
            return list[Math.floor(Math.random()*list.length)]
    }

    var getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    var startRain = function () {
        console.log("ARE YOU READY FOR A MIRACLE?");

        // When the image of his holiness loads, show it and animate it.
        var $saleBox = $('.sale-box');
        // How long in ms to wait until adding another sale box.
        var interval = 200;
        var numSales = 0;

        // Adds a sale box at a random x position.
        var addSale = function() {
            // Get the width every time we add a sale to account for dynamic widths.
            // Thanks ocbaker on github for finding this bug.
            var pageWidth = $('body').width();
            var maxSales = (pageWidth/70)*5
            var xPos = getRandomInt(0, pageWidth);
            var gameScore = randomChoice(BEST_SCORES);
            var teamColor = randomChoice(TEAMS);
            // Just copy the hidden box we had at page load time to make a new box.
            var newSale = $saleBox.clone().show();

            newSale.text(gameScore); // >js >strings

            newSale.css("left", xPos);
            newSale.css("background-color", teamColor);
            $('body').append(newSale);

            //Only have maxSales sale boxes onscreen at once.
            if (numSales < maxSales) {
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
        $('div.prepare-gag').hide();
        startGabe();
        startRain();
        $audio.trigger('play');
        window.setTimeout(
                function() {
                    $('div.sunburst').fadeIn(4000);
                }
                , 8000)
    }


    //TODO: system requirements for these legit CSS animations
    var $steamFrame = $('iframe.steam')

    $steamFrame.load(function() {
        if (iframeReady) {
            return
        }
        iframeReady = true; //programming
    });

    $gabe = $('div.gag > img');
    //Even if we loaded from cache, praise be. Nothing can cache his holiness forever.
    if ($gabe[0].complete) {
        gabeReady = true;
    }
    else {
        $gabe.load(function () {
            gabeReady = true;
        });
    }

    $audio = $('audio');
    $audio.on('loadedmetadata', function() {
        audioReady = true;
    });
    $audio.on('ended', function() {
        this.currentTime = 0;
        this.play();
    });

    var prepareWallet = function() {
        if (gabeReady && iframeReady && audioReady) {
            $('.prepare-loader').css('max-height', $('.prepare-loader > img').height() / 3 + 'px');
            window.setTimeout(praiseBeToGaben, 1000);
        } else {
            window.setTimeout(prepareWallet, 100);
        }
    }

    prepareWallet();
});



