//TODO (maybe) (thanks peter ward) : 20% opacity sunshine thing behind gabe.
//TODO each click loads more images

$(function() {

    var gabeReady = false;
    var iframeReady = false;
    var audioReady = false;

    var BEST_SCORES = [136, 161, 178, 116, 128, 186, 134, 103, 116, 216, 167]
    var TEAMS = ["#f00", "#00f"]

    // lolsorandom
    var randomChoice = function(list) {
            return list[Math.floor(Math.random()*list.length)]
    }

    var getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    var startRain = function () {
        console.log("ARE YOU READY FOR A MIRACLE?");

        var $saleBox = $('.sale-box');
        var interval = 200;
        var numSales = 0;

        var addSale = function() {
            var pageWidth = $('body').width();
            var maxSales = (pageWidth/70)*5
            var xPos = getRandomInt(0, pageWidth);
            var gameScore = randomChoice(BEST_SCORES);
            var teamColor = randomChoice(TEAMS);
            var newSale = $saleBox.clone().show();

            newSale.text(gameScore); // >js >strings

            newSale.css("left", xPos);
            newSale.css("background-color", teamColor);
            $('body').append(newSale);

            if (numSales < maxSales) {
                window.setTimeout(addSale, interval);
                numSales++;
            }

        };

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



