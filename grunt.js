module.exports = function(grunt){
	grunt.initConfig({
		lint: {
			files: ['grunt.js', 'tasks/*.js', 'app.js']
		}
	});

	grunt.loadTasks('./tasks');
	grunt.registerTask('default', 'lint');
};