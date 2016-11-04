// Important modules this config uses
const path = require('path');
const webpack = require('webpack');

module.exports = require('./webpack.base.babel')({
  // In production, we skip all hot-reloading stuff
  entry: [
    path.join(process.cwd(), 'lib/index.js'),
  ],

  // Utilize long-term caching by adding content hashes (not compilation hashes) to compiled assets
  output: {
    path: "dist",
    filename: "timecamp-api.[name].js",
    library: ["timecamp-api", "[name]"],
    libraryTarget: "umd"
  },
  devtool: 'source-map',
  plugins: [

  ],
});
