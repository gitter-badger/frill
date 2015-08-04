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
export default (gulp, $, argv, path) => {
  gulp.task('doc', () => {
    return gulp.src(['./src'])
      .pipe($.esdoc({
        destination: './docs',
        title: 'FrillJS',
        // includes: ['\\.(js|es6)$'],
        // excludes: ['\\.config\\.(js|es6)$'],
        // access: ['public', 'protected'],
        // autoPrivate: true,
        // unexportIdentifier: false,
        // undocumentIdentifier: true,
        // builtinExternal: true,
        // importPathPrefix: '',
        // index: './README.md',
        // package: './package.json',
        // coverage: true,
        // test: {
        //   type: 'mocha',
        //   source: './test/src',
        //   includes: ['Test\\.(js|es6)$'],
        //   excludes: ['\\.config\\.(js|es6)$']
        // }
        // styles: ['./path/to/style.css'],
        // scripts: ['./path/to/script.js']
      }));
  });

  gulp.task('doc:open', () => {
    return gulp.src('./docs/index.html')
      .pipe($.open());
  });
};
