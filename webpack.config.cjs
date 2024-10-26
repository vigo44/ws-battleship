const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  target: "node",
  externalsPresets: {
    node: true,
  },

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
      },
    ],
  },

  resolve: {
    extensions: [".ts", ".js"],
  },
  mode: "production",
};
