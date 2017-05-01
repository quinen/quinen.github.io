var webpack = require('webpack');
var path = require('path');

var APP_DIR = path.resolve(__dirname, 'app');
var BUILD_DIR = path.resolve(__dirname, 'public');

module.exports = {
  entry: APP_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR + "/..",
    filename: './public/bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?/,
      include: APP_DIR,
      loader: 'babel-loader',
      query: { presets: ["env", "react"] }
    }, {
      test: /\.(css)$/,
      use: ['style-loader', 'css-loader']
    }, {
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      loader: 'file-loader?name=public/fonts/[name].[ext]'
    }, {
      test: /\.(png|jpg)$/,
      loader: 'file-loader?name=public/img/[name].[ext]'
    }]
  },
  //devtool: "cheap-module-source-map", //"eval"    
  devServer: {
    historyApiFallback: true
  }
  /*,plugins : [
        new HtmlWebpackPlugin({
       template: 'app/index.html'
    })
    ]*/
};
