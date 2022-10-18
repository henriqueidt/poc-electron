module.exports = {
  resolve: {
    extensions: [".js"],
  },
  entry: "./electron/main.js",
  module: {
    rules: require("./rules.webpack"),
  },
};
