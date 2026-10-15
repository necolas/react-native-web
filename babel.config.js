const createConfig = ({ modules }) => {
  const plugins = [
    ['babel-plugin-syntax-hermes-parser', { parseLangTypes: 'flow' }],
    ['@babel/plugin-transform-runtime', { version: '7.18.6' }]
  ].concat(modules ? ['babel-plugin-add-module-exports'] : []);

  return {
    assumptions: {
      iterableIsArray: true
    },
    comments: true,
    presets: [
      [
        '@babel/preset-env',
        {
          loose: true,
          modules,
          exclude: ['transform-typeof-symbol'],
          targets: {
            browsers: [
              'chrome 96',
              'edge 96',
              'firefox 94',
              'safari 15.1',
              'ios_saf 15.1'
            ]
          }
        }
      ],
      '@babel/preset-react',
      '@babel/preset-flow'
    ],
    plugins: plugins
  };
};

module.exports = function (api) {
  if (api) {
    api.cache(true);
  }

  return process.env.BABEL_ENV === 'commonjs' || process.env.NODE_ENV === 'test'
    ? createConfig({ modules: 'commonjs' })
    : createConfig({ modules: false });
};
