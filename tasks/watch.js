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

    $.runSequence('build', () => {
      $._watch = true;
      gulp.watch(assets, ['assets']);
      gulp.watch(styles, ['stylus']);
      gulp.watch(clients, ['webpack']);
      cb();
    });
  });
}
