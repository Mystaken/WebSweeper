// jshint esversion: 6
'use strict';

const gulp = require('gulp'),
  jshint   = require('gulp-jshint'),
  util     = require('gulp-util'),
  apidoc   = require('gulp-apidoc'),
  exec     = require('child_process').exec;

gulp.task('jshint', function(done) {
  gulp.src(['./controllers/**/*.js', './lib/**/*.js', './models/**/*.js', './sockets/*.js', 'app.js', 'gulpfile.js'])
    .pipe(jshint("./config/.jshintrc"))
    .on('end', function(){ util.log('Jshint finished.'); })
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('doc', function(done){
  apidoc({
    src: 'controllers/',
    dest: 'doc/',
    config: './config/',
    silent: true
  }, done);
});


gulp.task('build', function(done) {
  exec('cd ../public && gulp build', function(error, stdout, stderr) {
    done(error);
  });
});

gulp.task('clean', function(done) {
  exec('cd ../public && gulp clean', function(error, stdout, stderr) {
    done(error);
  });
});

gulp.task('deploy', ['doc', 'clean'], function(done) {
  exec('cd ../public && gulp deploy', function(error, stdout, stderr) {
    done(error);
  });
});


gulp