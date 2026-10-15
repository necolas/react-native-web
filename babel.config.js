const createConfig = ({ modules }) => {
  const plugins = [
    ['babel-plugin-syntax-hermes-parser', { parseLangTypes: 'flow' }],
    '@babel/plugin-transform-flow-strip-types'
  ].concat(modules ? ['babel-plugin-add-module-exports'] : []);

  return {
    plugins,
    presets: [
      ['@babel/preset-react', { useSpread: true }],
      [
        '@babel/preset-env',
        {
          loose: true,
          modules,
          targets: {
            browsers: ['chrome 96', 'firefox 94', 'safari 15.1', 'ios_saf 15.1']
          }
        }
      ]
    ]
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
