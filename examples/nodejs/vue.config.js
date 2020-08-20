const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = {
  lintOnSave: false,
  css: { extract: false },
  transpileDependencies: ["pdfjs-dist"],
  configureWebpack: {
    plugins: [new BundleAnalyzerPlugin()]
  }
};
