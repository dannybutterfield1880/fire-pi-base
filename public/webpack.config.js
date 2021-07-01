const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  const isDevelopment = !isProduction;
  return {
    devtool: false,
    devtool: isDevelopment ? 'eval-source-map' : 'source-map',
    // mode: isDevelopment ? 'development' : 'production',
    entry: {
      "bundle.js": ["./src/index.js"],
    },
    output: {
      publicPath: "/",
      path: path.join(__dirname, "dist"),
      filename: "[name].min.js",
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              cacheCompression: false,
              envName: isProduction ? "production" : 'development'
            }
          }
        },
        {
          test: /\.(png|jpg|gif)$/i,
          use: {
            loader: "url-loader",
            options: {
              limit: 8192,
              name: "static/media/[name].[hash:8].[ext]"
            }
          }
        },
        {
          test: /\.svg$/,
          use: ["@svgr/webpack"]
        },
        {
          test: /\.(eot|otf|ttf|woff|woff2)$/,
          loader: require.resolve("file-loader"),
          options: {
            name: "static/media/[name].[hash:8].[ext]"
          }
        },
        {
          parser: {
            amd: false
          }
        }
      ],
    },
    plugins: [
      //new CompressionPlugin(),
      // new CopyWebpackPlugin({
      //   patterns: [
      //     { from: "assets", to: "" },
      //   ],
      // }),
      // isProduction &&
      //   new UglifyJsPlugin({
      //     sourceMap: true
      //   }),
      // isProduction && 
      //   new MiniCssExtractPlugin({
      //     filename: "/css/[name].css",
      //     chunkFilename: "/css/[name].chunk.css"
      //   }),
      // new webpack.DefinePlugin({
      //   "process.env.NODE_ENV": 
      //     isProduction ? "production" : "development"
      // }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "index.html"),
        inject: true
      })
    ].filter(Boolean),
    // optimization: {
    //   minimize: true ? true : false,
    //   minimizer: [
    //     new TerserWebpackPlugin({
    //       terserOptions: {
    //         compress: {
    //           comparisons: false
    //         },
    //         mangle: {
    //           safari10: true
    //         },
    //         output: {
    //           comments: false,
    //           ascii_only: true
    //         },
    //         warnings: false
    //       }
    //     }),
    //     new OptimizeCssAssetsPlugin()
    //   ],
    //   splitChunks: {
    //     chunks: true ? 'all' : 'initial',
    //     minSize: 0,
    //     maxInitialRequests: 20,
    //     maxAsyncRequests: 20,
    //     cacheGroups: {
    //       vendors: {
    //         test: /[\\/]node_modules[\\/]/,
    //         name(module, chunks, cacheGroupKey) {
    //           const packageName = module.context.match(
    //             /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
    //           )[1];

    //           return `${cacheGroupKey}.${packageName.replace("@", "")}`;
    //         }
    //       },
    //       common: {
    //         minChunks: 2,
    //         priority: -10
    //       }
    //     }
    //   },
    //   runtimeChunk: "single"
    // },
    target: 'web',
    devServer: {
      // compress: true,
      // historyApiFallback: true,
      // open: true,
      // overlay: true,
      disableHostCheck: true,
      hot: true,
      contentBase: '/'
    },
    resolve: {
      extensions: [".js", ".jsx"]
    }
  }
}