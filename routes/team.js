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
		header : 'teams',
		playerList : shared.teamSort(players)
	}

	/* GET home page. */
	router.get('/', function(req, res, next) {
		//filter content.playerList to only show a team once
		content.listName = 'teams';
		content.playerList = shared.teamsOnly(content.playerList);
		res.setHeader('Content-Type', 'application/json');
		res.render('team', content);
	});

	/* GET specific team. */
	router.get('/:id', function(req, res, next) {
		//search for that team based on the id
		var search = req.params.id;
		content.listName = 'players';
		content.playerList = shared.teamSearch(content.playerList, search);
		content.search = search;
		res.setHeader('Content-Type', 'application/json');
		res.render('team', content);
	});

}

module.exports = router;
