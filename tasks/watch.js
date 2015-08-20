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
    const styles = ['src/styles/**/*.{css,styl}'];
    const assets = ['./src/assets/**/*'];

    // const clients = [
    //   './src/components/**/*',
    //   './src/utils/**/*',
    //   './src/actions/**/*',
    //   './src/stores/**/*',
    //   './src/routes.jsx',
    //   './src/bootstrap.js',
    //   './src/client.js',
    // ];

    // set specific files for performance improvements
    // const checkFlowTypes = [
    //   'src/**/*.js',
    //   'src/**/*.jsx',
    // ];

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
      // gulp.watch(clients, gazeOption, ['webpack']);
      // gulp.watch(checkFlowTypes, gazeOption, ['flowtype'])
      gulp.watch(checkLint, gazeOption, ['lint']);
      cb();
    });
  });
};
