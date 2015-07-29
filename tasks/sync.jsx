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

import browserSync from 'browser-sync';

export default (gulp, $, argv, path) => {
  // Launch BrowserSync development server
  gulp.task('sync', ['serve'], (cb) => {
    browserSync({
      logPrefix: 'RSK',
      notify: false,
      // Run as an https by setting 'https: true'
      // Note: this uses an unsigned certificate which on first access
      //       will present a certificate warning in the browser.
      https: false,
      // Informs browser-sync to proxy our Express app which would run
      // at the following location
      proxy: 'localhost:5000'
    }, cb);

    process.on('exit', () => {
      browserSync.exit();
    });

    gulp.watch(['build/**/*.*'].concat(
      src.server.map(file => '!' + file)
    ), (file) => {
      browserSync.reload(path.relative(__dirname, file.path));
    });
  });

}
