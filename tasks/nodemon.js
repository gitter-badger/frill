/**
 * Frill
 * @author nanopx(@nanopx)
 *
 * ---------------------------------------------------------------
 * nodemon.js
 * ---------------------------------------------------------------
 *
 * Gulp task for serving Node.js(express) server.
 *
 */
export default (gulp, $, argv) => {
  // Increase this when script gets slower at loading
  const RELOAD_AFTER_MS = 3000;

  gulp.task('nodemon', ['watch'], (cb) => {
    const _args = process.argv.slice(2);
    let called = false;

    const ignoreWatching = [
      'src/utils',
      'src/actions',
      'src/stores',
      'src/assets',
      'src/styles',
    ];

    return $.nodemon({
      verbose: argv.verbose,
      script: 'app.js',
      ext: 'js jsx jade',
      watch: ['src'],
      ignore: ignoreWatching,
      args: _args,
    })
    .on('start', () => {
      if (!called) {
        called = true;
        setTimeout(cb, RELOAD_AFTER_MS);
      }
    })
    .on('restart', (e) => {
      if (!argv.silent) {
        $.util.log('Server restarted by \'' + e[0] + '\'');
      }
      setTimeout($.browserSync.reload, RELOAD_AFTER_MS);
    });
  });
};
