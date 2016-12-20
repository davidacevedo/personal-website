import express from 'express';
import morgan from 'morgan';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './webpack/dev.config.js';

const app = express();
const port = process.env.PORT || 3000;
const compiler = webpack(webpackConfig);

app.use(morgan('short'));
app.use(express.static('public'));

app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: '/' }));
app.use(webpackHotMiddleware(compiler, { log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000 }));

app.listen(3000, () => {
  console.log(`Listening on port ${port}`);
});