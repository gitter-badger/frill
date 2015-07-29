/**
 * Frill
 * @author nanopx(@nanopx)
 *
 * ---------------------------------------------------------------
 * clean.js
 * ---------------------------------------------------------------
 *
 * Gulp task for cleaning up build/.tmp folders.
 *
 */

export default (gulp, $, argv, path) => {
  // Clean output directory
  gulp.task('clean', $.del.bind(
    null, ['.tmp', 'public/*', '!public/.git'], {dot: true}
  ));
}
