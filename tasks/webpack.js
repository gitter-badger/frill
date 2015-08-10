/**
 * Frill
 * @author nanopx(@nanopx)
 *
 * ---------------------------------------------------------------
 * webpack.js
 * ---------------------------------------------------------------
 *
 * Watches file changes and builds the application.
 *
 */

import webpackConfig from '../webpack.config.js';

export default (gulp, $, argv, path) => {
  gulp.task('webpack', (cb) => {
    webpackConfig.watch = true;
    gulp.src('src/client.js')
    .pipe($.webpack(webpackConfig))
    .pipe(gulp.dest('./'))
    .pipe($.if($._watch, $.browserSync.reload({stream: true})));
    cb();
    // const bundler = $.webpack(webpackConfig);
    // bundler.run(() => {
    //   if ($._watch) $.browserSync.reload();
    //   cb();
    // });
  });
};
