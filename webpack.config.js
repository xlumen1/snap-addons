const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "development",

  entry: {
    // Inject webextension-polyfill automatically into each script
    background: ["webextension-polyfill", "./src/background.js"],
    content: ["webextension-polyfill", "./src/content.js"],
    popup: ["webextension-polyfill", "./src/popup.js"],
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    clean: true, // optional: clear dist/ before each build
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "string-replace-loader",
            options: {
              search: /require\(["']webextension-polyfill["']\);?/g,
              replace: "",
            },
          },
        ],
      },
    ],
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
      ],
    }),
  ],

  // Produce more readable dev output; you can switch to "production" for release
  devtool: "cheap-module-source-map",
};
