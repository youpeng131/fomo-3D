'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const api = require('../server/api');

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    },
    before(app) {
      // 接口
      app.use('/api/counter', (req, res) => {
        let urls = [
          'https://api.eosstud.com/counter'
        ];

        let options = {
          uri: urls[0],
          method: 'get',
          timeout: 5000
          // headers: {
          //     'Host': "maps.googleapis.com",
          //     'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          //     'Accept-Encoding': 'gzip, deflate, sdch, br',
          //     'Accept-Language': 'zh-CN,zh;q=0.8,en;q=0.6,ja;q=0.4',
          //     'Cache-Control': 'max-age=0',
          //     'Upgrade-Insecure-Requests': '1',
          //     'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36',
          //     'X-Client-Data': 'CJe2yQEIprbJAQjBtskB'

          // }
        };

        rp(options).then((json) => {
          console.log(json);
        }).catch((e) => {
          console.log(e);
        }).finally(() => {
          res.send({ 'msg': '', code: 0, data: [] });
        });


      });


      // 接口
      app.use('/api/balance', (req, res) => {
        let urls = [
          'https://api.eosstud.com/balance'
        ];

        let options = {
          uri: urls[0],
          method: 'get',
          timeout: 5000
        };

        rp(options).then((json) => {
          console.log(json);
        }).catch((e) => {
          console.log(e);
        }).finally(() => {
          res.send({ 'msg': '', code: 0, data: [] });
        });


      });


      // 接口
      app.use('/api/player', (req, res) => {
        let urls = [
          'https://api.eosstud.com/player'
        ];

        let options = {
          uri: urls[0],
          method: 'get',
          timeout: 5000
        };

        rp(options).then((json) => {
          console.log(json);
        }).catch((e) => {
          console.log(e);
        }).finally(() => {
          res.send({ 'msg': '', code: 0, data: [] });
        });


      });
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
