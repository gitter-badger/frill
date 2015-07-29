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
    // $.livereload.listen();

    $.runSequence('build', () => {
      $._watch = true;
      gulp.watch($.src.assets, ['assets']);
      gulp.watch($.src.styles, ['stylus']);
      // gulp.watch($.src.clients, ['browserify']);
      cb();
    });
  });
}
