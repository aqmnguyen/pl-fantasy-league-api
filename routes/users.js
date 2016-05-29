var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('users', { title: 'Specific Player' });
});

// /* GET users listing. */
// router.get('/', function(req, res, next) {
	
//     // var db = req.db;
//     // var collection = db.get('hoganapp');

//     var collection = {
//         'player' : 'Michael',
//         'player' : 'Michael 2'
//     }

//     collection.find({},{},function(e,docs){
    	
//         res.render('users', {
//         	title: 'Express-Users',
//             /*
//             "userlist" : [ 
//             	{ "email" : "aqmnguyen@gmail.com" , "username" : "user1" },
//             	{ "email" : "aqmnguyen@gmail.com" , "username" : "user2" }

//             ]
//             */
//             "userlist" : docs
//         });
//     });

// });

// /* GET certain user */
// router.get('/certainuser/', function(req, res, next){

//     var db = req.db;
//     var collection = db.get('hoganapp');

//     //req.query = gets the query string
//     var QSArray  = req.query;
//     var email;
    
//     if(typeof QSArray.email != "undefined"){
//         email = QSArray.email;
//     }else{
//         email = "";
//     }
    

//     collection.find({"email" : QSArray.email},{},function(e, docs){

//         //console.log(Object.keys(docs).length); //count the object size
//         var objSize = Object.keys(docs).length;

//         res.render('users', {
//             title: "Express-Certain Users",
//             "userlist" : docs
//         });

//     });
    
// });


module.exports = router;
