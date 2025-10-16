const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "development",

  entry: {
    // Inject webextension-polyfill automatically into each script
    background: "./src/background.js",
    content: "./src/content.js",
    popup: "./src/popup.js"
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    clean: true, // optional: clear dist/ before each build
  },

  resolve: {
    fallback: {
      fs: false,
      path: false,
      os: false,
    },
  },

  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: "manifest.json" },
        { from: "html" },
        { from: "css" },
        { from: "plugins", to: "plugins" },
        { from: "node_modules/webextension-polyfill/dist/browser-polyfill.js", to: "webextension-polyfill.js" },
      ],
    }),
  ],

  // Produce more readable dev output; you can switch to "production" for release
  devtool: "cheap-module-source-map",
};
