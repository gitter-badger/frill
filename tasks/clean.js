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

export default (gulp, $) => {
  // Clean output directory
  gulp.task('clean', $.del.bind(
    null, ['.tmp', 'public/*', '!public/.git'], {dot: true}
  ));
};
