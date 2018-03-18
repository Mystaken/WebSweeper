const exec = require('child_process').exec,
  gulp     = require('gulp'),
  clean    = require('gulp-clean'),
  sequence = require('gulp-sequence');

/**
 * Removes the built application.
 */
gulp.task('clean', function(done) {
  return gulp.src('../api/.build', {read: false})
    .pipe(clean({force: true}));
});

/**
 * Builds the front end.
 */
gulp.task('build', function (done) {
  exec('ng build --no-progress --prod', function (err, stdout, stderr) {
    done(err);
  });
});

/**
 * Deploys the application
 */
gulp.task('deploy', function(done) {
  sequence('clean', 'build')(done);
});
