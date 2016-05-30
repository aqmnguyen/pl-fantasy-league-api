var curl = require('curlrequest');
var $ = require('cheerio');

module.exports = {
  getHTMLContent: function (url, callback) {
    // do some code
    var options = {
    	url : url
    }
    curl.request(options, function(err, raw){
    	if(err) throw err;
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
  playerSearchName : function(array, name) {
    console.log('playerSearchName');
    var players = [];
    $(array).each(function(index, value){

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
  teamsOnly : function(array){
    var teams = [];
    var arrayObject = [];

    $(array).each(function(index, value){
      var playerTeam = value.team.trim();
      if(teams.indexOf(playerTeam) === -1){
        teams.push(playerTeam);
        var t = {
          name : false,
          team : playerTeam,
          points : false,
          price : false,
          position: false
        }
        arrayObject.push(t);
      }
    });
    arrayObject = lastPlayer(arrayObject);
    return arrayObject;

  },
  teamSearch : function(array, name){
    console.log('teamSearch');
    var players = [];
    $(array).each(function(index, value){
      var playerTeam = value.team.toLowerCase().trim();
      if(playerTeam.indexOf(name.toLowerCase()) > -1){
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
  teamSort : function(array){
    array.sort(function(a, b){
      if(a.team < b.team) return -1;
      if(a.team > b.team) return 1;
      return 0;
    });
    return array;
  },
  lastPlayer : lastPlayer
};

function lastPlayer (array) {
  //this determines the last item of the array and applies the last identifier 
  //to the json request for us to display
  if(array.length){
    array[array.length - 1].last = true;
  }
  return array;
}