const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = {
  lintOnSave: false,
  transpileDependencies: ["pdfjs-dist"],
  configureWebpack: {
    plugins: [new BundleAnalyzerPlugin()],
    module: {
      rules: [
        {
          test: /\.(cur)$/,
          use: ["file-loader"]
        }
      ]
    }
  }
};
