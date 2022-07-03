module.exports = function (api) {
  if (api) {
    api.cache(true);
  }

  let modules = false;

  if (process.env.BABEL_ENV === 'commonjs' || process.env.NODE_ENV === 'test') {
    modules = 'commonjs';
  }

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          loose: true,
          modules,
          exclude: ['transform-typeof-symbol'],
          targets: {
            browsers: [
              'chrome 38',
              'android 4',
              'firefox 40',
              'ios_saf 7',
              'safari 7',
              'ie 10',
              'ie_mob 11',
              'edge 12',
              'opera 16',
              'op_mini 12',
              'and_uc 9',
              'and_chr 38'
            ]
          }
        }
      ],
      '@babel/preset-react',
      '@babel/preset-flow'
    ],
    plugins: [
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
    ].concat(modules ? ['babel-plugin-add-module-exports'] : [])
  };
};
