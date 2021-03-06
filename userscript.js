// ==UserScript==
// @match        https://bitcoinwisdom.com/markets/bitfinex/btcusd
// @grant        none
// ==/UserScript==

// alert('hello world');
$('#price').bind('DOMSubtreeModified', changePrice);

var CZKRate; // no default value

(function getCZK() { // Get CZK Rate and save it
    $.getJSON('https://openexchangerates.org/api/latest.json?app_id=674164b685614285b6c1b3de1ef1e4e3', function(data){
        CZKRate = data.rates.CZK;
    });
})(); // Function will call itself

function changePrice(){
    if($('#price').text()!=''){
        //alert('price changed');
        var usdPrice = parseFloat($('#price').text());
        var czkPrice = Number ((usdPrice * CZKRate).toFixed(1));
        //$('#price').html(usdPrice + '<br />' + czkPrice + ' CZK')
        //console.log(usdPrice);
        //console.log(czkPrice);
        $('#price').unbind('DOMSubtreeModified');
        $('#price').html(usdPrice + ' USD<br />' + czkPrice + ' CZK');
        $('#price').bind('DOMSubtreeModified', changePrice);
    }
}

setInterval(function() {
    getCZK();
}, 43200000); // Update every 12 hours 