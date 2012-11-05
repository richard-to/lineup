var server = function(config){
	var path = require('path');
	var _ = require('underscore');
	var express = require('express');

	var app = express();

	app.engine('html', require('ejs').renderFile);
	app.set('view', path.join(__dirname, 'views'));
	app.set('view engine', 'html');
	app.set('env', 'development');

	app.use(express.static(path.join(__dirname, 'public')));

	app.get('/', function(req, res){
		res.render('index'); 
	});

	return app;
};

var app = server();
app.listen(5000);