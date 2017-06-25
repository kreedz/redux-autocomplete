const path = require('path');
const webpack = require('webpack');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
  entry: [
    './src/index.tsx'
  ],
  output: {
    path: path.resolve('dist/assets'),
    filename: 'prod.bundle.js',
    sourceMapFilename: 'prod.map'
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    modules: [
      path.resolve('./src'),
      path.resolve('./node_modules')
    ]
  },
  module: {
    rules: [
      {
         test: /\.tsx?$/,
         enforce: 'pre',
         loader: 'tslint-loader',
         include: [
           path.resolve(__dirname, 'src'),
         ],
      },
      {
        enforce: 'pre',
        test: /\.css$/,
        use: {
          loader: 'typed-css-modules-loader',
          options: {
            camelCase: true
          }
        },
        exclude: /node_modules/,
        include: [
          path.resolve(__dirname, 'src'),
        ],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        include: [
          path.resolve(__dirname, 'src'),
        ],
        use: [
          {
            loader: 'babel-loader',
           options: {
             plugins: ['transform-runtime'],
             presets: ['es2015', 'react',  'stage-0'],
           }
          },
          {
            loader: 'ts-loader',
          },
        ]
      },
      {
        test: [/\.eot?$/],
        use: [
          {
            loader: 'file-loader'
          }
        ]
      },
      {
        test: [/\.woff?$/, /\.woff2?$/, /\.ttf?$/, /\.svg?$/],
        use: [
          {
            loader: 'url-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
                modules: true,
                camelCase: true,
                importLoaders: 1,
                localIdentName: '[path][name]__[local]--[hash:base64:5]'
            }
          }
        ]
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true
      },
      comments: false
    })
  ]
}
