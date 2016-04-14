var gulp = require('gulp');
var livereload = require('gulp-livereload');

require('./tasks/assemble');
require('./tasks/browserify');
require('./tasks/sass');

gulp.task('build', [
	'assemble',
	'browserify',
	'sass'
]);