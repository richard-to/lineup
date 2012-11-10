module.exports = function(grunt) {

    grunt.registerTask('bower:install', 'Fetch bower components."', function() {
        grunt.helper('bower-install');
    });

    grunt.registerHelper('bower-install', function() {
        var bower = require('bower');
        var done = grunt.task.current.async();
        bower.commands
            .install()
            .on('error', function(error){
                grunt.log.writeln(error);
                done(false);
            })
            .on('end', function (data) {
                grunt.helper('bower-assets', done);
            });
    });

    grunt.registerHelper('bower-assets', function(done) {
        var fs = require('fs');
        var sh = require('shelljs');
        var assets = grunt.config('bower.assets');

        fs.readFile('./component.json', function(err, data){
            if(err === null){
                var components = JSON.parse(data);
                for(var component in components.dependencies){
                    var asset = assets[component] || component;
                    sh.cp('-f', 
                        './components/' + component + '/' + asset + '.js',
                        './public/js/vendor/');
                    grunt.log.writeln("Moved " + component + " to js vendor folder.");
                }
                done(true);
            } else {
                grunt.log.error(err);
                done(false);
            }
        });
    });
};
