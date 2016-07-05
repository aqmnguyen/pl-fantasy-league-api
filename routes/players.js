var express = require('express');
var router = express.Router();
var PL = require('../shared');
var shared = new PL();

var content = {
	title : 'Premier League Fantasy League API - Players',
	header : 'Players'
}

/* GET home page. */
router.get('/', function(req, res, next) {
	shared.getHTMLContent('https://www.fantasyleague.com/Classic/Stats/playerlist.aspx?dpt=0')
	.then(function(response){
		//console.log(response);
		var players = shared.lastPlayer(response);
		content.playerList = players;
		res.setHeader('Content-Type', 'application/json');
		res.render('players', content);
	});
});

/* GET specific player. */
router.get('/:id', function(req, res, next) {

	shared.getHTMLContent('https://www.fantasyleague.com/Classic/Stats/playerlist.aspx?dpt=0')
	.then(function(response){
		//console.log(response);
		var players = shared.lastPlayer(response);
		content.playerList = players;
		//search for that player based on the id
		content.playerList = shared.playerSearchName(content.playerList, req.params.id);
		content.search = req.params.id;
		res.setHeader('Content-Type', 'application/json');
		res.render('players', content);
	});		

});

module.exports = router;


