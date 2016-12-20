const webpack = require('webpack');
const path = require('path');
const postcssImport = require('postcss-import');
const autoprefixer = require('autoprefixer');

const TARGET = process.env.npm_lifecycle_event;
process.env.BABEL_ENV = TARGET;

module.exports = {
  devtool: '#eval-source-map',

  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client',
    './src/index',
  ],

  output: {
    path: `${__dirname}/../dist/public`,
    filename: 'bundle.js',
    publicPath: '/',
  },

  resolve: {
    extensions: ['.jsx', '.js', '.json', '.scss'],
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
      loader: 'style!css?modules&localIdentName=[path][name]--[local]!postcss!resolve-url!sass?sourceMap',
    }, {
      test: /\.css$/,
      loader: 'style!css',
    }],
  },

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

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: process.env.NODE_ENV === 'development' ? '"development"' : '"production"',
      },
      __DEVELOPMENT__: process.env.NODE_ENV === 'development',
      __PRODUCTION__: process.env.NODE_ENV === 'production',
      __CLIENT__: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
};