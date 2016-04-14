var gulp = require('gulp');
var assemble = require('assemble');
var prettify = require('gulp-prettify');
var rename = require('gulp-rename');
var livereload = require('gulp-livereload');

gulp.task('assemble', function() {
  var app = assemble();

  app.helper('is', require('handlebars-helper-equal'));
  app.helper('md', require('helper-md'));
  app.helpers('./templates/helpers/*.js');

  app.layouts('./templates/layouts/*.hbs');
  app.partials('./modules/**/*.hbs');
  app.pages('./templates/pages/**/*.hbs');
  app.option('layout', 'default');

  return app.toStream('pages')
    .pipe(app.renderFile())
    .pipe(rename({
      extname: '.html'
    }))
    .pipe(prettify({
      type: 'html',
      indent_size: 2,
      indent_char: ' ',
      indent_inner_html: true,
      preserve_newlines: true,
      max_preserve_newlines: 1
    }))
    .pipe(app.dest('./dist/'))
    .pipe(livereload());
});
