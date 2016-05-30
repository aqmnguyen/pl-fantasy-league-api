var express = require('express');
var curl = require('curlrequest');
var router = express.Router();
var shared = require('../shared');
var $ = require('cheerio');

shared.getHTMLContent('http://fantasy.premierleague.com/player-list/', routeResponse);

function routeResponse(players){
	//console.log(players);
	//sort players by team
	var content = {
		title : 'Premier League Fantasy League API - Teams',
		header : 'Teams',
		playerList : shared.teamSort(players)
	}

	/* GET home page. */
	router.get('/', function(req, res, next) {
		console.log('index');
		res.setHeader('Content-Type', 'application/json');
		res.render('team', content);
	});

	/* GET specific team. */
	router.get('/:id', function(req, res, next) {
		//search for that team based on the id
		var search = req.params.id;
		content.playerList = shared.teamSearch(content.playerList, search);
		content.search = search;
		res.setHeader('Content-Type', 'application/json');
		res.render('team', content);

	});

}


module.exports = router;


