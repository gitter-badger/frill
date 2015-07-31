/**
 * Frill
 * @author nanopx(@nanopx)
 *
 * ---------------------------------------------------------------
 * assets.js
 * ---------------------------------------------------------------
 *
 * Gulp task for building up asset files.
 * Copy assets and templates into build folder.
 *
 */
export default (gulp, $, argv, path) => {

  gulp.task('assets:images', () => {

    const images = ['./src/assets/images/**'];

    return gulp.src(images)
      .pipe($.changed('public'))
      .pipe($.imagemin())
      .pipe(gulp.dest('public'))
      .pipe($.size({title: 'assets:images'}));
  });

  gulp.task('assets:vendor', () => {

    const vendor = ['./src/assets/vendor/**'];

    return gulp.src(vendor)
      .pipe($.changed('public'))
      .pipe(gulp.dest('public'));
  });

  gulp.task('assets', ['assets:images', 'assets:vendor']);
}