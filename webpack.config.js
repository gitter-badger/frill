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
const DEBUG = !RELEASE;

const GLOBALS = {
  '__RELEASE__': RELEASE,
  '__DEBUG__': DEBUG,
  '__SERVER__': false,
  'process.env': Object.keys(process.env).reduce((o, k) => {
    o[k] = JSON.stringify(process.env[k]);
    return o;
  }, {}),
};

export default {
  entry: './src/client.js',
  output: {
    filename: './public/bundle.js',
  },
  cache: DEBUG,
  debug: DEBUG,
  stats: {
    colors: true,
    reasons: DEBUG,
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
  ].concat(DEBUG ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
  ]),
  devtool: DEBUG ? 'source-map' : false,
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
