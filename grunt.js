module.exports = function(grunt){
	grunt.initConfig({
		lint: {
			files: ['grunt.js', 'tasks/*.js', 'app.js']
		},
		bower: {
			assets: {'requirejs': 'require'}
		}
	});

	grunt.loadTasks('./tasks');
	grunt.registerTask('default', 'lint');
};