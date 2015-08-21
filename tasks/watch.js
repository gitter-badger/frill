/**
 * Frill
 * @author nanopx(@nanopx)
 *
 * ---------------------------------------------------------------
 * watch.js
 * ---------------------------------------------------------------
 *
 * Watches file changes and builds the application.
 *
 */
export default (gulp, $) => {
  gulp.task('watch', (cb) => {
    $._watch = false;
    $._watchBuild = true;
    const styles = ['src/styles/**/*.{css,styl}'];
    const assets = ['./src/assets/**/*'];

    // set specific files for performance improvements
    const checkLint = [
      'app.js',
      'gulpfile.babel.js',
      'webpack.config.js',
      '__test__/**/*.js',
      '__test__/**/*.jsx',
      'tasks/**/*.js',
      'tasks/**/*.jsx',
      'src/**/*.js',
      'src/**/*.jsx',
    ];

    const gazeOption = {
      // wait for 5 sec until next execution
      debounceDelay: 5000,
    };

    $.runSequence('build', () => {
      $._watch = true;
      gulp.watch(assets, gazeOption, ['assets']);
      gulp.watch(styles, gazeOption, ['stylus']);
      gulp.watch(checkLint, gazeOption, ['lint']);
      cb();
    });
  });
};
