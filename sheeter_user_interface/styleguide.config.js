// eslint-disable-next-line import/no-unresolved
const { version } = require('./package.json');

module.exports = {
  pagePerSection: true,
  title: 'Sheeter documentation',
  version,
  ignore: ['app/components/**/tests/**.js'],
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        }
      ]
    }
  },
  sections: [
    {
      content : 'docs/README.md',
      components : 'docs/**/*.md'
    },
    {
      name: 'UI Components',
      components: 'app/components/**/index.js',
    }
  ]
};