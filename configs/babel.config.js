const createConfig = ({ modules }) => {
  const plugins = [
    '@babel/plugin-transform-flow-strip-types',
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-proposal-object-rest-spread', { useBuiltIns: true }],
    '@babel/plugin-proposal-nullish-coalescing-operator',
    [
      '@babel/plugin-transform-runtime',
      {
        version: '7.18.6'
      }
    ]
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
              'chrome 49',
              'firefox 52',
              'ios_saf 11',
              'safari 11',
              'edge 79',
              'opera 36'
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
