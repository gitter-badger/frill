/**
 * Frill
 * @author nanopx(@nanopx)
 *
 * ---------------------------------------------------------------
 * test.js
 * ---------------------------------------------------------------
 *
 * Execute tests.
 *
 */

export default (gulp, $, argv, path) => {
  gulp.task('test', () => {
    return gulp.src([
      '**/__test__/*.js',
      '**/__test__/*.jsx',
    ], {read: false})
      .pipe($.mocha({}));
  });
};
