var PORT = process.env.PORT || 3000;

var express = require('express');
var fs = require('fs');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();
//var router = require('./routes/main')(app);
var path = require('path');

//DB Setting
mongoose.connect(process.env.MONGO_DB);
var db = mongoose.connection; 
db.once("open",function () {
  console.log("DB connected!");
});
db.on("error",function (err) {
  console.log("DB ERROR :", err);
});
//DB Setting end..

//other Setting///
app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));

//Routes
app.use('/', require('./routes/main'));
app.use('/posts', require('./routes/post'));


// Port Setting
 var server = app.listen(PORT, function(){
	console.log("Connected!")
});

