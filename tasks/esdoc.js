/**
 * Frill
 * @author nanopx(@nanopx)
 *
 * ---------------------------------------------------------------
 * esdoc.js
 * ---------------------------------------------------------------
 *
 * Auto-generate documents using ESDoc.
 *
 */

import config from '../esdoc';

export default (gulp, $, argv, path) => {
  gulp.task('doc', () => {
    return gulp.src(['./src'])
      .pipe($.esdoc(config));
  });

  gulp.task('doc:open', () => {
    return gulp.src('./docs/index.html')
      .pipe($.open());
  });
};
