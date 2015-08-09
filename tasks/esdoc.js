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
        package: './package.json',
        index: './README_DOC.md',
        title: 'FrillJS',
        includes: ['\\.(js|jsx)$'],
        coverage: true,
        // excludes: ['\\.config\\.(js|jsx)$'],
        // access: ['public', 'protected'],
        // autoPrivate: true,
        // unexportIdentifier: false,
        // undocumentIdentifier: true,
        // builtinExternal: true,
        // importPathPrefix: '',
        test: {
          type: 'mocha',
          source: './test',
          includes: ['Test\\.(js|jsx)$'],
          excludes: ['\\.config\\.(js|jsx)$'],
        },
        // styles: ['./path/to/style.css'],
        // scripts: ['./path/to/script.js']
      }));
  });

  gulp.task('doc:open', () => {
    return gulp.src('./docs/index.html')
      .pipe($.open());
  });
};
