var server = function(config){
    var path = require('path');
    var _ = require('underscore');
    var express = require('express');
    var sh = require('shelljs');
    var gm = require('gm');
    var fs = require('fs');
    var async = require('async');
    var spawn = require('child_process').spawn;
    var utils = require('./lib/utils');
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
            var imgType = req.files.image.type;
            if(imgType != 'image/jpeg' && imgType != 'image/png') {
                res.json(500, "Error!");
                return;
            }

            var imgName = req.files.image.name;
            var uploadDir = req.files.image.path.substring((__dirname + "/tmp/").length) + "/";
            var uploadUrlPath = '/uploads/' + uploadDir;
            var uploadFilePath = __dirname + '/public' + uploadUrlPath;
            
            var outFileNameJpg = utils.replaceFileExt(imgName, 'jpg');
            var outFileNamePng = utils.replaceFileExt(imgName, 'png');
            var outFilePathJpg = uploadFilePath + outFileNameJpg;
            var outFilePathPng = uploadFilePath + outFileNamePng;
            
            sh.mkdir('-p', uploadFilePath);
            sh.cp('-f', req.files.image.path, uploadFilePath + imgName);

            var result = spawn('pngout', [uploadFilePath + imgName, outFilePathPng]);
            result.on('exit', function(code){
                gm(outFilePathPng).write(outFilePathJpg, function(err){
                    var result = spawn('jpegtran', ['-o', '-copy', 'none', 
                        '-outfile', outFilePathJpg, outFilePathJpg]);
                    result.on('exit', function(code){
                        console.log(code);
                        var funcs = [];
                        var image_quality = [];
                        for(var i = 10; i > 1; --i){
                            funcs.push((function(i){ 
                                return function(callback){
                                    var quality = i*10;
                                    var newFile =  quality + "_" + outFileNameJpg;
                                    image_quality.push({"image": uploadUrlPath + newFile});
                                    gm(outFilePathJpg).quality(quality).write(uploadFilePath + newFile, function(err){
                                        if (!err) {
                                            fs.stat(uploadFilePath + newFile, function(err, stats){
                                                callback(null, {
                                                    image: uploadUrlPath + newFile,
                                                    size: Math.round(stats.size / 1000)
                                                });
                                            });
                                        }
                                    });
                                };
                            })(i));
                        }

                        async.parallel(funcs, function(err, results){
                            res.json({image: uploadUrlPath + imgName, optimized: results});
                        });
                    });
                });
            });
        } else {
            res.json(500, "Error!");
        }
    });

    return app;
};

var app = server();
app.listen(5000);