/**
 * Frill
 * @author nanopx(@nanopx)
 *
 * ---------------------------------------------------------------
 * webpack.config.js
 * ---------------------------------------------------------------
 *
 * Webpack configuration for client bundle.
 *
 */
import webpack, {DefinePlugin} from 'webpack';
import minimist from 'minimist';

const argv = minimist(process.argv.slice(2));
const RELEASE = Boolean(argv.release);
const GLOBALS = {
  '__ENV__': RELEASE,
  '__SERVER__': false,
};

export default {
  entry: './src/client.js',
  output: {
    filename: './public/bundle.js',
  },
  cache: RELEASE,
  debug: RELEASE,
  stats: {
    colors: true,
    reasons: RELEASE,
  },
  resolve: {
    extensions: [
      '',
      '.js',
      '.jsx',
      '.es6',
    ],
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new DefinePlugin(GLOBALS),
  ].concat(RELEASE ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
  ]),
  devtool: RELEASE ? 'source-map' : false,
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  externals: {
    react: 'React',
  },
};
