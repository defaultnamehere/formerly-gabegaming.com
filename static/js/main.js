
//TODO (thanks peter ward) : 20% opacity sunshine thing behind gabe.

$(function() {

    /*

    var hackCSS = $('#hackity-hack');

    var height = $(this).height();

    //Use our own ridiculous string substitution language, ban ourselves from r/programming
    var hackHTML = hackCSS.html();
    hackHTML = hackHTML.replace("%70", height*0.7);
    hackHTML = hackHTML.replace("%80", height*0.8);
    hackHTML = hackHTML.replace("%100", height);
    hackCSS.html(hackHTML);
    */

    var steamSales = [10, 25, 33, 50, 66, 75, 80, 90]

    var randomChoice = function(list) {
            return list[Math.floor(Math.random()*list.length)]
    }

    var startGabe = function () {

    var $saleBox = $('.sale-box');
    var interval = 200;
    var addSale = function() {
        var pageWidth = $('body').width();
        var xPos = getRandomInt(0, pageWidth);
        var percentOff =  randomChoice(steamSales);
        var newSale = $saleBox.clone().show();
        newSale.text("-" + percentOff + "%"); // >js
        newSale.css("left", xPos);
        $('body').append(newSale);
        window.setTimeout(addSale, interval);

        window.setTimeout(function() {
            newSale.remove();
        }, 2000);

    };

    //TODO: system requirements
    var getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    window.setInterval(function() {
        interval = Math.max(10, interval - 10);
    }, 500);

    window.setTimeout(addSale, 2*1000);

    };

    var $steamFrame = $('iframe.steam')
    $steamFrame.load(function() {
        var height = $steamFrame.contents().height();
        var width = $steamFrame.contents().width();
        $steamFrame.height(height);
        $steamFrame.width(width);

        startGabe(); //programming

    });


});



