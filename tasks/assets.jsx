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
    $.src = $.src || {};
    $.src.assets = [];

    const _images = './src/assets/images/**';
    $.src.assets.push(_images);

    return gulp.src(_images)
      .pipe($.changed('public'))
      .pipe($.imagemin())
      .pipe(gulp.dest('public'))
      .pipe($.size({title: 'assets:images'}));
  });

  gulp.task('assets', ['assets:images']);
}
