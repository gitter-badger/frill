/**
 * Frill
 * @author nanopx(@nanopx)
 *
 * ---------------------------------------------------------------
 * build.js
 * ---------------------------------------------------------------
 *
 * Gulp task for building up application.
 * Run tasks: "clean", "assets",
 *
 */
export default (gulp, $, argv, path) => {
  gulp.task('build', ['clean'], (cb) => {
    $.runSequence([
      'assets',
      'stylus',
      // 'flowtype',
      `lint`,
      'webpack',
    ], cb);
  });
};
