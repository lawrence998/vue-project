var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: './dist/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.sass$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader?indentedSyntax'
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            'scss': [
              'vue-style-loader',
              'css-loader',
              'sass-loader'
            ],
            'sass': [
              'vue-style-loader',
              'css-loader',
              'sass-loader?indentedSyntax'
            ]
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(woff|svg|eot|ttf)\??.*$/,
        exclude: /node_modules/,
        loader: 'url-loader?limit=90000&name=[path][name].[ext]'
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader'
      }

    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true,
    proxy: {
      '/getRecommend': {
        target: 'http://localhost:1200/getRecommend',
        changeOrigin: true,
        pathRewrite: {
          '^/getRecommend': ''
        }
      },
      '/youlike': {
        target: 'http://localhost:1200/youlike',
        changeOrigin: true,
        pathRewrite: {
          '^/youlike': ''
        }
      },
      '/hotcity': {
        target: 'http://localhost:1200/hotcity',
        changeOrigin: true,
        pathRewrite: {
          '^/hotcity': ''
        }
      },
      '/houseImg': {
        target: 'http://localhost:1200/houseImg',
        changeOrigin: true,
        pathRewrite: {
          '^/houseImg': ''
        }
      },
      '/houseImg2': {
        target: 'http://localhost:1200/houseImg2',
        changeOrigin: true,
        pathRewrite: {
          '^/houseImg2': ''
        }
      },
      '/getCity': {
        target: 'http://localhost:1200/getCity',
        changeOrigin: true,
        pathRewrite: {
          '^/getCity': ''
        }
      },
      '/sx': {
        target: 'http://localhost:1200/sx',
        changeOrigin: true,
        pathRewrite: {
          '^/sx': ''
        }
      },
      '/lowPrice': {
        target: 'http://localhost:1200/lowPrice',
        changeOrigin: true,
        pathRewrite: {
          '^/lowPrice': ''
        }
      },
      '/highPrice': {
        target: 'http://localhost:1200/highPrice',
        changeOrigin: true,
        pathRewrite: {
          '^/highPrice': ''
        }
      },
      '/goodPing': {
        target: 'http://localhost:1200/goodPing',
        changeOrigin: true,
        pathRewrite: {
          '^/goodPing': ''
        }
      },
      '/rander': {
        target: 'http://localhost:1200/rander',
        changeOrigin: true,
        pathRewrite: {
          '^/rander': ''
        }
      },
      '/getUsername': {
        target: 'http://localhost:1200/getUsername',
        changeOrigin: true,
        pathRewrite: {
          '^/getUsername': ''
        }
      },
      '/LoginIn': {
        target: 'http://localhost:1200/LoginIn',
        changeOrigin: true,
        pathRewrite: {
          '^/LoginIn': ''
        }
      },
      '/Login': {
        target: 'http://localhost:1200/Login',
        changeOrigin: true,
        pathRewrite: {
          '^/Login': ''
        }
      },
      '/orderlist': {
        target: 'http://localhost:1200/orderlist',
        changeOrigin: true,
        pathRewrite: {
          '^/orderlist': ''
        }
      },
      '/orderpage': {
        target: 'http://localhost:1200/orderpage',
        changeOrigin: true,
        pathRewrite: {
          '^/orderpage': ''
        }
      },
      '/qxdd': {
        target: 'http://localhost:1200/qxdd',
        changeOrigin: true,
        pathRewrite: {
          '^/qxdd': ''
        }
      },
      '/pay': {
        target: 'http://localhost:1200/pay',
        changeOrigin: true,
        pathRewrite: {
          '^/pay': ''
        }
      },
      '/DetailOrder': {
        target: 'http://localhost:1200/DetailOrder',
        changeOrigin: true,
        pathRewrite: {
          '^/DetailOrder': ''
        }
      },
      '/insertOrder': {
        target: 'http://localhost:1200/insertOrder',
        changeOrigin: true,
        pathRewrite: {
          '^/insertOrder': ''
        }
      },
      '/saleSan': {
        target: 'http://localhost:1200/saleSan',
        changeOrigin: true,
        pathRewrite: {
          '^/saleSan': ''
        }
      },
      '/product': {
        target: 'http://localhost:1200/product',
        changeOrigin: true,
        pathRewrite: {
          '^/product': ''
        }
      },
      '/getImg': {
        target: 'http://localhost:1200/getImg',
        changeOrigin: true,
        pathRewrite: {
          '^/getImg': ''
        }
      },
      '/addUser': {
        target: 'http://localhost:1200/addUser',
        changeOrigin: true,
        pathRewrite: {
          '^/addUser': ''
        }
      }
    }
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
