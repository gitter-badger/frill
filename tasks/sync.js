/**
 * Frill
 * @author nanopx(@nanopx)
 *
 * ---------------------------------------------------------------
 * sync.js
 * ---------------------------------------------------------------
 *
 * BrowserSync
 *
 */

export default (gulp, $, argv) => {
  // Launch BrowserSync development server
  gulp.task('sync', ['nodemon'], (cb) => {
    $.browserSync.init({
      // logPrefix: 'BS',
      notify: true,
      https: false,
      proxy: 'http://127.0.0.1:3000',
      logLevel: argv.verbose ? 'debug' : 'silent',
      port: 3001,
    }, cb);
  });

  gulp.task('sync:reload', (cb) => {
    $.browserSync.reload();
    cb();
  });
};
