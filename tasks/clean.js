module.exports = function(grunt){
	grunt.registerTask('clean:uploads', "Cleans up uploaded files", function(){
		var sh = require('shelljs');
		sh.rm('-rf', './tmp/*', './public/uploads/*');
		grunt.log.writeln('Deleting file uploads.');
	});
};