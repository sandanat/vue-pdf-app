module.exports = {
  lintOnSave: false,
  transpileDependencies: ["pdfjs-dist"],
  configureWebpack: {
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
