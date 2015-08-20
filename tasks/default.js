/**
 * Frill
 * @author nanopx(@nanopx)
 *
 * ---------------------------------------------------------------
 * default.js
 * ---------------------------------------------------------------
 *
 * The default task for gulp.
 *
 * Initialize and watch  Application / Application Server
 * Run tasks: "build", "serve", "sync",
 *
 */
export default (gulp) => {
  gulp.task('default', ['sync']);
};
