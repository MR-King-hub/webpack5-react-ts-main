const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const PurgeCSSPlugin = require('purgecss-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const globAll = require('glob-all');

module.exports = merge(baseConfig, {
  mode: 'production',
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../public'),
          to: path.resolve(__dirname, '../dist'),
          filter: source => !source.includes('index.html'),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:8].css',
    }),
    new PurgeCSSPlugin({
      paths: globAll.sync([
        `${path.join(__dirname, '../src')}/**/*.{tsx,jsx,js,ts}`,
        `${path.join(__dirname, '../public')}/index.html`,
      ]),
      safelist: {
        standard: [/^ant-/],
      },
    }),
    new CompressionPlugin({
      test: /\.(js|css)$/,
      filename: '[path][base].gz',
      algorithm: 'gzip',
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          compress: {
            drop_console: true, 
          },
        },
      }),
    ],
    splitChunks: {
      chunks: 'all', // 分割所有类型的代码
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
    runtimeChunk: 'single', // 提取 runtime 代码
  },
  performance: {
    hints: 'warning', // 性能提示
    maxEntrypointSize: 512000, // 入口文件最大体积
    maxAssetSize: 512000, // 生成文件最大体积
  },
});