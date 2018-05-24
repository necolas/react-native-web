module.exports = {
  presets: [
    [
      'babel-preset-env',
      {
        loose: true,
        modules: process.env.MODULES || false,
        exclude: ['transform-es2015-typeof-symbol'],
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
    'babel-preset-react',
    'babel-preset-flow'
  ],
  plugins: [
    ['babel-plugin-transform-class-properties', { loose: true }],
    ['babel-plugin-transform-object-rest-spread', { useBuiltIns: true }],
    ['babel-plugin-transform-react-remove-prop-types', { mode: 'wrap' }]
  ]
};
