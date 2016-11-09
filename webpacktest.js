//This file configures webpack to run on the test files
var path = require('path');
var webpack = require('webpack');
var test = {
  "spec": "./test/spec.js"
};

module.exports = {
  cache: true,
  entry: test,
  output: { 
    path: path.join(__dirname, 'test/dist'),
    publicPath: '',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
