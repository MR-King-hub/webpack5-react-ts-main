示例项目

其中 ./src/weda 是下载的微搭代码包，可使用 npm install ./src/weda 进行安装；请注意node版本应该为16。

用户需要在 ./src/App.tsx中填入自己的 envId 来使用对应的云开发服务，


// webpack.prod.js
const path = require('path')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.js')
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const PurgeCSSPlugin = require('purgecss-webpack-plugin')
const CompressionPlugin  = require('compression-webpack-plugin')
const globAll = require('glob-all')

module.exports = merge(baseConfig, {
  mode: 'production',
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../public'),
          to: path.resolve(__dirname, '../dist'), 
          filter: source => {
            return !source.includes('index.html') 
          }
        },
      ],
    }),
    new CompressionPlugin({
      test: /\.(js|css)$/, 
      filename: '[path][base].gz', 
      algorithm: 'gzip', 
      threshold: 10240, 
      minRatio: 0.8 // 压缩率
    })
  ],
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        parallel: true, // 开启多线程压缩
        terserOptions: {
          compress: {
            pure_funcs: ["console.log"]
          }
        }
      }),
    ],
    splitChunks: { 
      cacheGroups: {
        vendors: { 
          test: /node_modules/,
          name: 'vendors',
          minChunks: 1, 
          chunks: 'initial',
          minSize: 0,
          priority: 1, 
        },
      }
    }
  },
})