var express = require('express');
var router = express.Router();
var PL = require('../shared');
var shared = new PL();

//sort players by team

/* GET home page. */
router.get('/', function(req, res, next) {
	shared.getHTMLContent('https://www.fantasyleague.com/Classic/Stats/playerlist.aspx?dpt=0')
	.then(function(response){
		//console.log(response);
		var content = {
			title : 'Premier League Fantasy League API - Teams',
			header : 'teams'
		}
		var players = shared.lastPlayer(response);

		players = shared.teamsOnly(content.playerList);
		content.playerList = players;
		content.listName = 'teams';
		res.setHeader('Content-Type', 'application/json');
		res.render('team', content);
	});
});

/* GET specific team. */
router.get('/:id', function(req, res, next) {
	shared.getHTMLContent('https://www.fantasyleague.com/Classic/Stats/playerlist.aspx?dpt=0')
	.then(function(response){

		var content = {
			title : 'Premier League Fantasy League API - Teams',
			header : 'teams'
		}

		var search = req.params.id;
		var players = shared.lastPlayer(response);
		
		players = shared.teamSearch(players, search);
		content.listName = 'players';
		content.playerList = players;
		content.search = search;
		res.setHeader('Content-Type', 'application/json');
		res.render('team', content);

	});
});



module.exports = router;
