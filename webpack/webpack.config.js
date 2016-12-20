const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const postcssImport = require('postcss-import');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: '#source-map',

  entry: [
    'babel-polyfill',
    './src/index',
  ],

  output: {
    path: `${__dirname}/../dist`,
    filename: 'bundle.js',
  },

  resolve: {
    extensions: ['', '.jsx', '.js', '.json', '.scss'],
    modules: ['node_modules'],
    alias: {
      actions: `${__dirname}/../src/actions`,
      components: `${__dirname}/../src/components`,
      containers: `${__dirname}/../src/containers`,
      reducers: `${__dirname}/../src/reducers`,
    }
  },

  module: {
    loaders: [{
      enforce: 'pre',
      test: /\.json$/,
      loader: 'json-loader',
    }, {
      test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url-loader',
      query: {
        limit: '10000',
        mimetype: 'application/font-woff',
      },
    }, {
      test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url-loader',
      query: {
        limit: '10000',
        mimetype: 'application/font-woff2',
      },
    }, {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url-loader',
      query: {
        limit: '10000',
        mimetype: 'application/octet-stream',
      },
    }, {
      test: /\.otf(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url-loader',
      query: {
        limit: '10000',
        mimetype: 'application/font-otf',
      },
    }, {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file-loader',
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url-loader',
      query: {
        limit: '10000',
        mimetype: 'mimetype=image/svg+xml',
      },
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
    }, {
      test: /\.(png|jpg|jpeg|gif)$/,
      loader: 'file-loader',
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract({ notExtractLoader: 'style-loader', loader: 'css?modules&minimize!postcss!resolve-url!sass?sourceMap' }),
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract({ notExtractLoader: 'style-loader', loader: 'css?minimize!postcss' }),
    }],
  },

  plugins: [
    new ExtractTextPlugin('bundle.css'),
    new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(en)$/),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new webpack.ProvidePlugin({
      fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch',
    }),
  ],

  sassLoader: {
    includePaths: [path.resolve(__dirname, '../src')],
  },

  postcss: (pack) => [
    autoprefixer({
      browsers: ['last 2 versions'],
    }),
    postcssImport({
      addDependencyTo: pack,
    }),
  ],
};