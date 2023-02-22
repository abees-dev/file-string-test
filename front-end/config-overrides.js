const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
var path = require('path');

module.exports = function override(config) {
  config.resolve = {
    fallback: {
      stream: require.resolve('stream-browserify'),
    },
    modules: [path.resolve(__dirname, '.'), 'node_modules'],
    extensions: ['.js', '.ts', '.tsx', '...'],
  };
  config.plugins.push(new NodePolyfillPlugin());
  return config;
};
