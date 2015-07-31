/**
 * Frill
 * @author nanopx(@nanopx)
 *
 * ---------------------------------------------------------------
 * stylus.js
 * ---------------------------------------------------------------
 *
 * Compiles stylus
 *
 */

import nib from 'nib';

export default (gulp, $, argv, path) => {
  const RELEASE = !!argv.release;
  const AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
  ];

  gulp.task('stylus', () => {
    return gulp.src('src/styles/style.styl')
      .pipe($.plumber())
      .pipe($.stylus({
        use: [nib()]
      }))
      .on('error', console.error.bind(console))
      .pipe($.autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
      .pipe($.csscomb())
      .pipe($.if(RELEASE, $.minifyCss()))
      .pipe(gulp.dest('./public'))
      .pipe($.size({title: 'styles'}))
      .pipe($.if($._watch, $.browserSync.reload));
  });
}
