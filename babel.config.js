export default function (api) {
  return {
    plugins: [
      ['babel-plugin-syntax-hermes-parser', { parseLangTypes: 'flow' }],
      '@babel/plugin-transform-flow-strip-types',

      ...(api.env('test')
        ? // Jest resolves paths without extensions. The extensions depend on other
          // files on disk, which Jest's transform cache does not track.
          []
        : // Output is published as "type": "module", which requires fully specified
          // import paths (e.g. './View/index.js', 'styleq/transform-localize-style.js')
          // Only list packages without an "exports" field in `includePackages`
          [['babel-plugin-fully-specified', { includePackages: ['styleq/'] }]])
    ],
    presets: [
      ['@babel/preset-react', { useSpread: true }],
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
