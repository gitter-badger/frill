/**
 * Frill
 * @author nanopx(@nanopx)
 *
 * ---------------------------------------------------------------
 * test.js
 * ---------------------------------------------------------------
 *
 * Execute tests.
 *
 */

export default (gulp, $) => {
  gulp.task('test', () => {
    return gulp.src([

      // to search through all __test__ directory,
      // uncomment these lines
      // '**/__test__/*.js',
      // '**/__test__/*.jsx',
      // and comment out paths below.
      // NOTE: you should also comment out 'test' config in esdoc.js task file.
      'test/**/*.js',
      'test/**/*.jsx',

    ], {read: false})
      .pipe($.mocha({
        timeout: 5000,
      }))
      .once('error', (err) => {
        throw err;
      })
      .once('end', () => {
        process.exit();
      });
  });
};
