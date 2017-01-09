var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var engine = require('ejs-mate');
//var ejsMate = require('ejs-mate'); 
var app = express();

// Connect to Mongolab
mongoose.connect('mongodb://root:1234@ds159208.mlab.com:59208/ecommerce', function(err){
	if (err) {
		console.log(err);
	}else{
		console.log('Connected to db')
	}
})

// Required models
var User = require('./models/user');

// MiddleWare
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.engine('ejs', engine);
// app.set('views',__dirname + '/views');
app.set('view engine', ejs); 


app.get('/',function(req,res){
  res.render('home.ejs', { what: 'best', who: 'me' });
});

app.get('/about',function(req,res){
  res.render('about.ejs');
});






app.post('/create-user', function(req, res, next){

	var user = new User();

	user.profile.name = req.body.name;
	user.password = req.body.password;
	user.email = req.body.email;

	user.save(function(err){
		if (err) {
			return next(err);
		}
		res.json("Successfully added");
	})

})

app.listen('3000', function(err){
	if (err) {
		throw err;
	}
	console.log("OK");
})



//console.log(new User());