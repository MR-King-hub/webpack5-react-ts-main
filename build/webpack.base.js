const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  entry: path.resolve(__dirname, '../src/index.tsx'),
  output: {
    filename: 'static/js/[name].[chunkhash:8].js', 
    path: path.resolve(__dirname, '../dist'),
    publicPath: isDev?'/':'./', 
  },
  stats: {
    all: false,
    warnings: true,
    errors: true,
    errorDetails: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/, 
        // 云开发 @cloudbase 依赖单独处理
        oneOf: [
          {
            include: /node_modules\/@cloudbase/,
            use: [
              'style-loader',
              'css-loader',
              'postcss-loader',
            ],
          },
        {use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ]}]
      },
      {
        test: /\.less$/, 
        enforce: 'pre',
        include: [path.resolve(__dirname, '../src'),path.resolve(__dirname, '../node_modules/block/src')],
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(scss|sass)$/, 
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"]
      },
      {
        test: /\.(jsx)$/,
        include: [path.resolve(__dirname, '../src'),path.resolve(__dirname, '../node_modules/block/src')],
        use: [ 'babel-loader']
      },
      {
        test: /\.(ts|tsx)$/,
        include: [path.resolve(__dirname, '../src')],
        enforce: 'pre',
        use: ['thread-loader', 'babel-loader']
      },
      createAssetRule(/\.(png|jpg|jpeg|gif|svg)$/, 'static/images'),
      createAssetRule(/\.(woff2?|eot|ttf|otf)$/, 'static/fonts'),
      createAssetRule(/\.(mp4|webm|ogg|mp3|wav|flac|aac)$/, 'static/media'),
    ]
  },
  resolve: {
    fallback: {
      buffer: require.resolve('buffer/'),
      // 其他需要的 polyfill
    },
    extensions: ['.js', '.tsx', '.ts','.jsx'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
        react: path.resolve('./node_modules/react'),
        'react-dom': path.resolve('./node_modules/react-dom')
    },
    modules: ['node_modules'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      inject: true
    }),
    new NodePolyfillPlugin({
			additionalAliases: ['process'],
		}),
    new webpack.DefinePlugin({
      'process.env.BASE_ENV': JSON.stringify(process.env.BASE_ENV)
    }),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser',
    }),
  ],
}

const createAssetRule = (test, outputPath) => ({
  test,
  type: 'asset',
  parser: {
    dataUrlCondition: {
      maxSize: 10 * 1024, // 10 KB
    },
  },
  generator: {
    filename: `${outputPath}/[name].[contenthash:6][ext]`,
  },
});