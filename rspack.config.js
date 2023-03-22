const path = require('path');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  entry: './codebase/index.tsx',
  output: {
    path: path.resolve(__dirname, 'codebase', 'dist', 'rspack'),
  },
  devServer: {
    open: true,
    port: 3333,
  },
  builtins: {
    html: [{ template: './codebase/webpack.html' }],
    define: {
      'process.env.NODE_ENV': `'${process.env.NODE_ENV}'`,
    },
  },
};
