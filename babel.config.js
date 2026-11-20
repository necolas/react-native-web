export default function (api) {
  return {
    shouldPrintComment: (comment) => comment === '#__PURE__',
    plugins: [
      ...(api.env('test')
        ? // Jest resolves paths without extensions. The extensions depend on other
          // files on disk, which Jest's transform cache does not track.
          []
        : // Output is published as "type": "module", which requires fully specified
          // import paths (e.g. './View/index.js')
          ['babel-plugin-fully-specified'])
    ],
    presets: [
      ['@babel/preset-react', { useSpread: true }],
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
}
