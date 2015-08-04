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
    const bundler = $.webpack(webpackConfig);
    bundler.run(() => {
      if ($._watch) $.browserSync.reload();
      cb();
    });
  });
};
