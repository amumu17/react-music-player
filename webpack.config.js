var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'sourve-map',
	entry: __dirname + '/app/index.js',
	output: {
		path: __dirname + '/dist',
		filename: 'bundle.js',
    publicPath: '/'
	},
  devServer: {
    inline: true,
    contentBase: __dirname
  },
  module: {
    rules: [
      {
        test: /\.jsx|\.js$/,
        use: {
          loader: 'babel-loader'
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [{
                loader: 'style-loader'
              },{
                loader: 'css-loader',
                options: {
                  module: true
                }
              },{
                loader: 'postcss-loader'
              }
        ]
      },
      {
        test: /\.less$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader'},
          {loader: 'less-loader'}
        ]
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin('create by amumu17'),
    new HtmlWebpackPlugin({
      template: __dirname + '/app/index.tpl.html'
    })
  ]
}