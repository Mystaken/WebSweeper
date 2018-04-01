// jshint esversion: 6
'use strict';

const gulp = require('gulp'),
  jshint   = require('gulp-jshint'),
  util     = require('gulp-util'),
  apidoc   = require('gulp-apidoc'),
  exec     = require('child_process').exec;

/** Runs the code with jshint */
gulp.task('jshint', function(done) {
  gulp.src(['./controllers/**/*.js', './lib/**/*.js', './models/**/*.js', './sockets/*.js', 'app.js', 'gulpfile.js'])
    .pipe(jshint("./config/.jshintrc"))
    .on('end', function(){ util.log('Jshint finished.'); })
    .pipe(jshint.reporter('jshint-stylish'));
});

/** Generates the api route documentation */
gulp.task('doc', function(done){
  apidoc({
    src: 'controllers/',
    dest: 'doc/',
    config: './config/',
    silent: true,
    template: "templates/apidoc"
  }, done);
});


/** Builds the front end application */
gulp.task('build', function(done) {
  exec('cd ../public && gulp build', function(error, stdout, stderr) {
    done(error);
  });
});

/** Remove any previously built application */
gulp.task('clean', function(done) {
  exec('cd ../public && gulp clean', function(error, stdout, stderr) {
    done(error);
  });
});

/** Deploys the application */
gulp.task('deploy', ['doc', 'clean'], function(done) {
  exec('cd ../public && gulp deploy', function(error, stdout, stderr) {
    done(error);
  });
});