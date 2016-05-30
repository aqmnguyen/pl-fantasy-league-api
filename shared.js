var curl = require('curlrequest');
var $ = require('cheerio');

module.exports = {
  getHTMLContent: function (url, callback) {
    // do some code
    console.log('getHTMLContent');
    var options = {
    	url : url
    }
    curl.request(options, function(err, raw){
    	if(err) throw err;
    	console.log('curl callback');
    	var players = [];

    	$('.ismLine', raw).each(function(index, value) {
    		var playerPosition = $('.ismElementList h2', raw).eq(index).text();
    		$('tbody tr', this).each(function(i, v){
    			var playerName = $('td', this).eq(0).text();
	    		var playerTeam = $('td', this).eq(1).text();
	    		var playerPoints = $('td', this).eq(2).text();
	    		var playerCost = $('td', this).eq(3).text();

	    		var player = {
	    			name : playerName,
	    			team : playerTeam,
	    			points : playerPoints,
	    			price : playerCost,
	    			position : playerPosition
	    		}
	    		players.push(player);
	    		});

    	});
    	callback(players);
    });

  },
  getJSONContent: function (url) {
  	// do some code
  	console.log('getJSONContent');
  	console.log(url);
  }
};