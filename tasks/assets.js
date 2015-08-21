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
export default (gulp, $, argv) => {
  gulp.task('assets', () => {
    $._watch = $._watch || false;
    return gulp.src('src/assets/**/*')
      .pipe($.changed('public'))
      .pipe($.imagemin())
      .pipe(gulp.dest('public'))
      .pipe($.if(!argv.silent, $.size({title: 'assets'})))
      .pipe($.if($._watch, $.browserSync.reload));
  });
};
