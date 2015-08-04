/**
 * Frill
 * @author nanopx(@nanopx)
 *
 * ---------------------------------------------------------------
 * eslint.js
 * ---------------------------------------------------------------
 *
 * Linter for ES6.
 *
 */
export default (gulp, $, argv, path) => {
  gulp.task('lint', () => {
    return gulp.src([
      'app.js',
      'gulpfile.babel.js',
      'webpack.config.js',
      '__test__/**/*.js',
      '__test__/**/*.jsx',
      'tasks/**/*.js',
      'tasks/**/*.jsx',
      'src/**/*.js',
      'src/**/*.jsx',
    ])
    .pipe($.eslint())
    .pipe($.eslint.format());
  });
};
