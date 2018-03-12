// jshint esversion: 6
'use strict';

const gulp = require('gulp'),
  jshint   = require('gulp-jshint'),
  util     = require('gulp-util'),
  apidoc   = require('gulp-apidoc');

gulp.task('jshint', function(done) {
  gulp.src(['./controllers/**/*.js', './lib/**/*.js', './models/**/*.js', 'api.js', 'gulpfile.js'])
    .pipe(jshint("./config/.jshintrc"))
    .on('end', function(){ util.log('Jshint finished.'); })
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('doc', function(done){
  apidoc({
    src: 'controllers/',
    dest: 'doc/',  
    config: './config/'
  }, done);
});