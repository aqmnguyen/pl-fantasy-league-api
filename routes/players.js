var express = require('express');
var curl = require('curlrequest');
var router = express.Router();
var shared = require('../shared');
var $ = require('cheerio');

shared.getHTMLContent('http://fantasy.premierleague.com/player-list/', filterArray);

function filterArray(array){
	console.log(array);
	buildCard(array);
}

function buildCard(players){

	var content = {
		title : 'Premier League Fantasy League API - Players',
		header : 'Players',
		playerList : players
	}

	/* GET home page. */
	router.get('/', function(req, res, next) {
		res.render('players', content);
	});

}
module.exports = router;


