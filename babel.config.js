export default {
  shouldPrintComment: (comment) => comment === '#__PURE__',
  // Output is published as "type": "module", which requires fully specified
  // import paths (e.g. './View/index.js')
  plugins: ['babel-plugin-fully-specified'],
  presets: [
    ['@babel/preset-react', { runtime: 'automatic' }],
    ['@babel/preset-typescript', { onlyRemoveTypeImports: true }],
    [
      '@babel/preset-env',
      {
        loose: true,
        modules: false,
        targets: {
          browsers: ['chrome 96', 'firefox 94', 'safari 15.1', 'ios_saf 15.1']
        }
      }
    ]
  ]
};
