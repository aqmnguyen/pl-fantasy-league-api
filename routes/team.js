var express = require('express');
var router = express.Router();
var PL = require('../shared');
var shared = new PL();

//sort players by team
var content = {
	title : 'Premier League Fantasy League API - Teams',
	header : 'teams'
}

/* GET home page. */
router.get('/', function(req, res, next) {
	shared.getHTMLContent('http://fantasy.premierleague.com/player-list/')
	.then(function(response){
		//console.log(response);
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
	shared.getHTMLContent('http://fantasy.premierleague.com/player-list/')
	.then(function(response){

		//search for that team based on the id
		var search = req.params.id;
		content.listName = 'players';
		var players = shared.lastPlayer(response);
		players = shared.teamSearch(players, search);
		content.playerList = players;
		content.search = search;
		res.setHeader('Content-Type', 'application/json');
		res.render('team', content);

	});
});



module.exports = router;
