module.exports = function(grunt) {

    grunt.registerTask('bower:install', 'Fetch bower components."', function() {
        grunt.helper('bower-install');
    });

    grunt.registerHelper('bower-install', function() {
        var bower = require('bower');
        var done = grunt.task.current.async();
        bower.commands
            .install('', {})
            .on('error', function(error){
                grunt.log.writeln(error);
                done(false);
            })
            .on('end', function (data) {
                grunt.helper('bower-assets');
            });
    });

    grunt.registerHelper('bower-assets', function() {
        var done = grunt.task.current.async();
        var fs = require('fs');

        fs.readFile('./component.json', function(err, data){
            if(err === null){
                var components = JSON.parse(data);
                for(var component in components.dependencies){ 
                    bowerLoc = fs.createReadStream('./components/' + component + '/' + component + '.js');
                    publicLoc = fs.createWriteStream('./public/js/vendor/' + component + '.js');
                    bowerLoc.pipe(publicLoc);
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
