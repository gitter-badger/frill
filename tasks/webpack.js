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

export default (gulp, $) => {
  gulp.task('webpack', (cb) => {
    webpackConfig.watch = $._watchBuild || false;
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
