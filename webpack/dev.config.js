const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');

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

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],

  resolve: {
    extensions: ['.jsx', '.js', '.json', '.scss'],
    modules: ['node_modules'],
    alias: {
      components: `${__dirname}/../src/components`,
      containers: `${__dirname}/../src/containers`,
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
};