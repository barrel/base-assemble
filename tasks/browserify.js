var gulp = require('gulp');
var browserify = require('browserify');
var shim = require('browserify-shim');
var watchify = require('watchify');
var vinylSrc = require('vinyl-source-stream');
var vinylBuffer = require('vinyl-buffer');

/** Defines the "browserify" task for Gulp. */
gulp.task('browserify', function(callback) {
  return browserifyTask(false, callback);
});

/** Defines the "watchify" task for Gulp. */
gulp.task('watchify', function() {
  return browserifyTask(true);
});

function browserifyTask(dev) {
  var b = browserify({
    entries: './src/js/main.js',
    paths: ['./src/js/'],
    transform: [
      [shim, {
        global: true
      }]
    ]
  });

  b.plugin('minifyify', {
    map: false
  });

  function bundle() {
    return b.bundle()
      .on('error', function (err) { console.error(err.message); })
      .on('end', function() {
        bundleLogger.end('main.min.js');
      })
      .pipe(vinylSrc('main.min.js'))
      .pipe(vinylBuffer())
      .pipe(gulp.dest('./dist/assets/js/'));
  }

  if(dev) {
    b = watchify(b);
    b.on('update', bundle);
  }

  return bundle();
}

var gutil = require('gulp-util');
var prettyHrtime = require('pretty-hrtime');
var startTime;

/** Logging functions for Browserify, originally from gulp-starter. */
var bundleLogger = {
  start: function(filepath) {
    startTime = process.hrtime();
    gutil.log('Bundling', gutil.colors.green(filepath));
  },

  end: function(filepath) {
    var taskTime = process.hrtime(startTime);
    var prettyTime = prettyHrtime(taskTime);
    gutil.log('Bundled', gutil.colors.green(filepath), 'in', gutil.colors.magenta(prettyTime));
  }
};
