/**
 * Frill
 * @author nanopx(@nanopx)
 *
 * ---------------------------------------------------------------
 * flowtype.js
 * ---------------------------------------------------------------
 *
 * Type checks
 *
 */

export default (gulp, $, argv, path) => {
  gulp.task('flowtype', () => {
    return gulp.src(['src/**/*.js', 'src/**/*.jsx'])
      .pipe($.flowtype({
        all: false,
        weak: false,
        killFlow: false,
        beep: true,
        abort: false,
      }));
  });
};
