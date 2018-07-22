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
const rp = require('request-promise');

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
        
        res.send({ 'msg': 'true', code: 0, data: [
          {
            balance: 56000,
            end_time: (Date.now() + 3600 * 1000 * 1.2) / 1000,
            key_price: 5120,
            last_buy_time: 1532243022,
            last_buyer: "eosseosseoss",
            owner: "studcontract",
            pot: 37450,
            sold_keys: "11.07691889541204588"
          }
        ] });
        
      });


      // 接口
      app.use('/api/balance', (req, res) => {
        
        res.send({ 'msg': 'true', code: 0, data: [
          {
            balance: 0,
            total: 22500,
            username: "aaa"
          },
          {
            balance: 6800,
            total: 6800,
            username: "bbb"
          },
          {
            balance: 15750,
            total: 64564,
            username: "ccc"
          }
        ] });
        


      });


      // 接口
      app.use('/api/player', (req, res) => {
        
        res.send({ 'msg': 'true', code: 0, data: [
          {
            keys: '6.8654',
            player_name: 'aaa'
          },
          {
            keys: '3.102',
            player_name: 'bbb'
          },
          {
            keys: '7.89',
            player_name: 'ccc'
          }
        ] });

      });

      app.use('/api/rank', (req, res) => {
        res.send({
          'msg': 'true', code: 0, data: [
            {"total": 8685, "amount": 35000, "keys": "6.99540555291353972", "player_name": "eosseosseoss"}, {"total": 1078, "amount": 16700, "keys": "3.33442308686418176", "player_name": "haydgnbyhege"}
          ]
        })
      })

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
