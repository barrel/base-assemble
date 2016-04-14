var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

/** Defines the "sass" task for Gulp. */
gulp.task('sass', function() {
  var sassOpts = {
    outputStyle: 'compressed',
    includePaths: []
  };
  
  return gulp.src('./src/scss/*.scss')
    .pipe(sass(sassOpts).on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./dist/assets/css'));
});