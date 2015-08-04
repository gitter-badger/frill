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
  const RELEASE = Boolean(argv.release);
  const AUTOPREFIXER_BROWSER = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10',
  ];

  gulp.task('stylus', () => {
    return gulp.src('./src/styles/style.styl')
      // .pipe($.plumber())
      .pipe($.stylus({
        use: [nib()],
      }))
      .on('error', console.error.bind(console))
      .pipe($.autoprefixer({browsers: AUTOPREFIXER_BROWSER}))
      .pipe($.csscomb())
      .pipe($.if(RELEASE, $.minifyCss()))
      .pipe($.if(!argv.silent, $.size({title: 'styles'})))
      .pipe(gulp.dest('./public'))
      .pipe($.if($._watch, $.browserSync.reload({stream: true})));
  });
};
