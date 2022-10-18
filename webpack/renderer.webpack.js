module.exports = {
  resolve: {
    extensions: [".js"],
  },
  module: {
    rules: require("./rules.webpack"),
  },
};
