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
      
      players = lastPlayer(players);
    	callback(players);
    });

  },
  getJSONContent: function (url) {
  	// do some code
  	console.log('getJSONContent');
  	console.log(url);
  },
  playerSearchName : function(array, name) {
    console.log('playerSearchName');
    var players = [];
    $(array).each(function(item, value){

      var playerName = value.name.toLowerCase().replace(/\s/g,'');

      if(playerName.indexOf(name.toLowerCase()) > -1){
        var player = {
          name : value.name,
          team : value.team,
          points : value.points,
          price : value.price,
          position : value.position
        }

        players.push(player);

      }
    });
    
    players = lastPlayer(players);
    return players;
  },
  lastPlayer : lastPlayer
};

function lastPlayer (array) {
  //this determines the last item of the array and applies the last identifier 
  //to the json request for us to display
  console.log('lastPlayer');
  if(array.length){
    array[array.length - 1].last = true;
  }
  
  return array;

}