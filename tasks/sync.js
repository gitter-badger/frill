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

export default (gulp, $, argv, path) => {

  // Launch BrowserSync development server
  gulp.task('sync', ['nodemon'], (cb) => {
    const server = ['src'];

    $.browserSync.init({
      // logPrefix: 'BS',
      notify: true,
      https: false,
      proxy: 'http://127.0.0.1:3000',
      logLevel: "debug",
      port: 3001,
    }, cb);

  });

}
