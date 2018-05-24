var path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== 'production'
var webpack = require('webpack');

module.exports = {
  mode: 'production',
  // configuration
  entry: {
    index: './src/index.js',
  }, //代表入口(总)文件，可以写多个
  output: {
    path: path.resolve(__dirname, "../dist/"), //输出文件夹
    filename: "[name].js"  //最终打包生成的文件名
  },
  module: {
    rules:  [
    {
        test: /\.s?[ac]ss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
    },{
      test: /\.js|jsx$/, //是一个正则，代表js或者jsx后缀的文件要使用下面的loader
      loader: "babel-loader",
      exclude:/node_modules/
    },{
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name].[hash:7].[ext]'
        }
    },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: devMode ? '[name].css' : './[name].css',
    }),
    new webpack.LoaderOptionsPlugin({
         compress: {
            properties: false,
            warnings: false
        },
        output: {
            beautify: true,
            quote_keys: true
        },
        mangle: {
            screw_ie8: false
        },
        sourceMap: false
   }),
  ]
};