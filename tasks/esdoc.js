import ESdoc from './_esdoc';

export default (gulp, $, argv, path) => {

  gulp.task('doc', () => {
    return gulp.src("./src")
      .pipe(ESdoc({
        destination: "./docs",
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
    var openPath = path.resolve(__dirname, '../docs/index.html');
    return gulp.src('./docs/index.html')
      .pipe($.open());
  });

}
