const path = require('path');

module.exports = {
  entry: './src/index.js',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    library: 'LinshareApiClient',
    libraryTarget: 'umd'
  }
};
