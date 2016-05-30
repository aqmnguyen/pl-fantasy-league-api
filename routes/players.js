var express = require('express');
var curl = require('curlrequest');
var router = express.Router();
var shared = require('../shared');
var $ = require('cheerio');

shared.getHTMLContent('http://fantasy.premierleague.com/player-list/', routeResponse);

function routeResponse(players){
	//console.log(players);
	var content = {
		title : 'Premier League Fantasy League API - Players',
		header : 'Players',
		playerList : players
	}

	/* GET home page. */
	router.get('/', function(req, res, next) {
		console.log('index');
		res.setHeader('Content-Type', 'application/json');
		res.render('players', content);
	});

	/* GET specific player. */
	router.get('/:id', function(req, res, next) {
		//search for that player based on the id
		content.playerList = shared.playerSearchName(content.playerList, req.params.id);
		content.search = req.params.id;
		res.setHeader('Content-Type', 'application/json');
		res.render('players', content);

	});

}


module.exports = router;


