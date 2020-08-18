const VueLoaderPlugin = require("vue-loader/lib/plugin");
const path = require("path");

module.exports = {
  output: {
    library: "PDFVue",
    libraryTarget: "umd",
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].js",
    chunkFilename: "js/[name].js"
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    },
    extensions: [".tsx", ".ts", ".mjs", ".js", ".jsx", ".vue", ".json", ".wasm"]
  },
  module: {
    noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
    rules: [
      /* config.module.rule('vue') */
      {
        test: /\.vue$/,
        loader: ["vue-loader"]
      },
      /* config.module.rule('js') */
      {
        test: /\.m?jsx?$/,
        exclude: [
          (filepath) => {
            // always transpile js in vue files
            if (/\.vue\.jsx?$/.test(filepath)) {
              return false;
            }
          }
        ],
        loader: ["babel-loader"]
      },
      /* config.module.rule('ts') */
      {
        test: /\.ts$/,
        use: [
          {
            loader: "babel-loader"
          },
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              appendTsSuffixTo: ["\\.vue$"],
              happyPackMode: false
            }
          }
        ]
      },
      /* config.module.rule('css') */
      {
        test: /\.css$/,
        oneOf: [
          /* config.module.rule('css').rule('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: "vue-style-loader",
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: "css-loader",
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: "[name]_[local]_[hash:base64:5]"
                  }
                }
              },
              {
                loader: "postcss-loader",
                options: {
                  options: {},
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('css').rule('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: "vue-style-loader",
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: "css-loader",
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: "postcss-loader",
                options: {
                  options: {},
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('css').rule('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: "vue-style-loader",
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: "css-loader",
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: "[name]_[local]_[hash:base64:5]"
                  }
                }
              },
              {
                loader: "postcss-loader",
                options: {
                  options: {},
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('css').rule('normal') */
          {
            use: [
              {
                loader: "vue-style-loader",
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: "css-loader",
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: "postcss-loader",
                options: {
                  options: {},
                  sourceMap: false
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('images') */
      {
        test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 4096,
              fallback: {
                loader: "file-loader",
                options: {
                  name: "img/[name].[hash:8].[ext]"
                }
              }
            }
          }
        ]
      },
      /* config.module.rule('svg') */
      {
        test: /\.(svg)(\?.*)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "img/[name].[hash:8].[ext]"
            }
          }
        ]
      },
      /* config.module.rule('fonts') */
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 4096,
              fallback: {
                loader: "file-loader",
                options: {
                  name: "fonts/[name].[hash:8].[ext]"
                }
              }
            }
          }
        ]
      },
      /* config.module.rule('cur') */
      {
        test: /\.(cur)$/,
        use: ["file-loader"]
      }
    ]
  },
  plugins: [new VueLoaderPlugin()]
};
