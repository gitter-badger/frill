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
export default (gulp, $, argv, path) => {

  gulp.task('watch', (cb) => {
    $._watch = false;
    const styles = ['src/styles/**/*.{css,styl}'];
    const assets = ['./src/assets/**/*'];
    const clients = [
      './src/components/**/*',
      './src/core/**/*',
      './src/utils/**/*',
      './src/actions/**/*',
      './src/stores/**/*',
      './src/routes.jsx',
      './src/bootstrap.js',
      './src/client.js'
    ];

    // set specific files for performance improvements
    const checkFlowTypes = [
      'src/**/*.js',
      'src/**/*.jsx',
    ];

    const gazeOption = {
      // wait for 5 sec until next execution
      debounceDelay: 5000
    };

    $.runSequence('build', () => {
      $._watch = true;
      gulp.watch(assets, gazeOption, ['assets']);
      gulp.watch(styles, gazeOption, ['stylus']);
      gulp.watch(clients, gazeOption, ['webpack']);
      gulp.watch(checkFlowTypes, gazeOption, ['flowtype'])
      cb();
    });
  });
}
