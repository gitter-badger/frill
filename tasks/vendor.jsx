/**
 * Frill
 * @author nanopx(@nanopx)
 *
 * ---------------------------------------------------------------
 * vendor.js
 * ---------------------------------------------------------------
 *
 * Build 3rd party libraries
 *
 */
const src = [
  // 'node_modules/bootstrap/dist/fonts/**'
];
const dest = 'public/vendor';

export default (gulp, $, argv, path) => {
  gulp.task('vendor', () => {
    return gulp.src(src).pipe(gulp.dest(dest));
  });
}
