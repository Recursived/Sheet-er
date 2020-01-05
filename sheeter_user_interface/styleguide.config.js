// eslint-disable-next-line import/no-unresolved
const { version } = require('./package.json');

module.exports = {
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
      name: 'Documentation',
      sections: [
        {
          name: 'Commands',
          content: 'docs/general/commands.md',
          description: 'Usable commands on this project'
        },
      ]
    },
    {
      name: 'UI Components',
      components: 'app/components/**/index.js',
    }
  ]
};