/**
 * Frill
 * @author nanopx(@nanopx)
 *
 *
 * ---------------------------------------------------------------
 * server.js
 * ---------------------------------------------------------------
 *
 * Gulp task for serving Node.js(express) server.
 *
 */
export default (gulp, $, argv, path) => {
  gulp.task('server:start', ['watch'], (cb) => {
    cb();
  //   $.src = $.src || {};
  //   $.src.server = ['config', 'src'];
  //
  //   const _args = process.argv.slice(2);
  //
  //   return $.nodemon({
  //     script: 'app.js',
  //     ext: 'js jsx coffee jade',
  //     watch: $.src.server,
  //     ignore: ['src/client.coffee', 'src/assets', 'src/styles'],
  //     args: _args
  //   })
  //   .on('restart', (e) {
  //     $.util.log('Server restarted by \'' + e[0] + '\'');
  //   })
  //   .on('log', (e) {
  //     if(/^starting/.test(e.message) && $._watch) {
  //       $.livereload.reload()
  //     }
  //   });
  });
}
