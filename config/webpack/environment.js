const { environment } = require('@rails/webpacker');
const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    sourceMap: true,
    postcssOptions: {
      config: path.resolve(__dirname, 'postcss.config.js'),
    },
  },
};

// Insert postcssLoader before css-loader in the 'css' loader array
environment.loaders.get('style').use.splice(-1, 0, postcssLoader);
console.log(environment.loaders);

module.exports = environment;
