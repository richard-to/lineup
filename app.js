var server = function(config){
    var path = require('path');
    var _ = require('underscore');
    var express = require('express');
    var sh = require('shelljs');

    var app = express();

    app.engine('html', require('ejs').renderFile);
    app.set('view', path.join(__dirname, 'views'));
    app.set('view engine', 'html');
    app.set('env', 'development');

    app.use(express.static(path.join(__dirname, 'public')));

    var uploadMiddleware = express.bodyParser(
        {keepExtensions: false, uploadDir: __dirname + "/tmp"});

    app.get('/', function(req, res){
        res.render('index'); 
    });

    app.post('/uploads/process', uploadMiddleware, function(req, res){
        if(req.files.image){
            var uploadDir = __dirname + '/public/uploads/' + 
                req.files.image.path.substring((__dirname + "/tmp/").length) + "/";
            sh.mkdir('-p', uploadDir);
            sh.cp('-f', req.files.image.path, uploadDir + req.files.image.name);
            res.json({ image: '/uploads/' + 
                req.files.image.path.substring((__dirname + "/tmp/").length) 
                + "/" + req.files.image.name });
        } else {
            res.json(500, "Error!")
        }
    });

    return app;
};

var app = server();
app.listen(5000);