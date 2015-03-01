var concat = require('gulp-concat');
var gulp   = require('gulp');
var jshint = require('gulp-jshint');
var karma  = require('karma').server;
var path   = require('path');
var wrap   = require("gulp-wrap");

function runKarma(configFile, cb) {
   karma.start({
      configFile: path.resolve(configFile),
      singleRun: true
   }, cb);
}

gulp.task('lint', function() {
  return gulp.src('./scripts/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('test', ['lint'], function(cb) {
   runKarma('karma.conf.js', cb);
});

gulp.task('package', ['lint'], function() {
  return gulp.src(['./scripts/annotated_image.js', './scripts/annotated_image/**/*.js', './scripts/module.js'])
    .pipe(concat('annotated_image.js'))
    .pipe(wrap('(function(angular){\n\n<%= contents %>\n\n}(angular));'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('default', ['test']);
