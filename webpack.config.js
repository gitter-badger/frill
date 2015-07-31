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
import path from 'path';
import webpack, {DefinePlugin} from 'webpack';
import minimist from 'minimist';

const argv = minimist(process.argv.slice(2));
const RELEASE = !argv.release;
const STYLE_LOADER = 'style-loader/useable';
const CSS_LOADER = RELEASE ? 'css-loader' : 'css-loader?minimize';
const AUTOPREFIXER_BROWSERS = [
  'Android 2.3',
  'Android >= 4',
  'Chrome >= 20',
  'Firefox >= 24',
  'Explorer >= 8',
  'iOS >= 6',
  'Opera >= 12',
  'Safari >= 6'
];
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
    reasons: RELEASE
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.es6']
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new DefinePlugin(GLOBALS)
  ].concat(RELEASE ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin()
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
      }
    ],
  },
  externals: {
    // Use external version of React (from CDN for client-side, or
    // bundled with ReactJS.NET for server-side)
    react: 'React'
  },
};
