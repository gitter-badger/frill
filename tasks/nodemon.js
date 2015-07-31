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
export default (gulp, $, argv, path) => {

  // Increase this when script gets slower at loading
  const RELOAD_AFTER_MS = 3000;

  gulp.task('nodemon', ['watch'], (cb) => {

    const _args = process.argv.slice(2);
    let called = false;

    return $.nodemon({
      script: 'app.js',
      ext: 'js jsx jade',
      watch: ['src'],
      ignore: ['src/client.js', 'src/assets', 'src/styles'],
      args: _args,
      // tasks: (changedFiles) => {
      //   let tasks = [];
      //   changedFiles.forEach((file) => {
      //     // if (path.extname(file) === '.js' && !~tasks.indexOf('lint')) tasks.push('lint');
      //     // if (path.extname(file) === '.css' && !~tasks.indexOf('cssmin')) tasks.push('cssmin');
      //   });
      //   tasks.push('sync:reload');
      //   return tasks;
      // },
    })
    .on('start', (e) => {
      if (!called) {
        called = true;
        setTimeout(cb, RELOAD_AFTER_MS);
      }
    })
    .on('restart', (e) => {
      $.util.log('Server restarted by \'' + e[0] + '\'');
      setTimeout($.browserSync.reload, RELOAD_AFTER_MS);
    });
  });
}
