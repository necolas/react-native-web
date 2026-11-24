import { defineConfig } from 'oxlint';

export default defineConfig({
  plugins: ['node', 'promise', 'react', 'typescript'],
  ignorePatterns: ['packages/**/vendor/*', 'packages/**/types/*'],
  env: {
    browser: true,
    node: true,
    jest: true
  },
  options: {
    typeAware: true
  },
  categories: {
    correctness: 'error',
    perf: 'error',
    suspicious: 'error'
  },
  rules: {
    'default-case': ['error', { commentPattern: '^no default$' }],
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    'new-cap': ['error', { newIsCap: true, capIsNew: false }],
    'no-alert': 'warn',
    'no-array-constructor': 'error',
    'no-case-declarations': 'error',
    'no-fallthrough': 'error',
    'no-inner-declarations': ['error', 'functions'],
    'no-label-var': 'error',
    'no-labels': ['error', { allowLoop: false, allowSwitch: false }],
    'no-lone-blocks': 'error',
    'no-loop-func': 'error',
    'no-multi-str': 'error',
    'no-new-func': 'error',
    'no-new-wrappers': 'error',
    'no-object-constructor': 'error',
    'no-proto': 'error',
    'no-redeclare': 'error',
    'no-regex-spaces': 'error',
    'no-return-assign': ['error', 'except-parens'],
    'no-script-url': 'error',
    'no-self-compare': 'error',
    'no-sequences': 'error',
    'no-shadow': 'off',
    'no-throw-literal': 'error',
    'no-undef': 'error',
    'no-underscore-dangle': 'off',
    'no-unneeded-ternary': ['error', { defaultAssignment: false }],
    'no-unused-vars': ['error', { vars: 'all', args: 'none' }],
    'no-useless-computed-key': 'error',
    'no-var': 'error',
    'prefer-const': 'error',
    'prefer-rest-params': 'error',
    radix: 'error',
    yoda: ['error', 'never'],

    // 'no-unused-vars': [
    //   'error',
    //   { argsIgnorePattern: '^_', ignoreRestSiblings: true }
    // ]

    // node
    'node/handle-callback-err': ['error', '^(err|error)$'],
    'node/no-path-concat': 'error',

    // promise
    'promise/always-return': 'off',
    'promise/param-names': 'error',

    // react
    'react/globals': 'off',
    'react/iframe-missing-sandbox': 'off',
    'react/immutability': 'off',
    'react/jsx-pascal-case': 'error',
    'react/no-children-prop': 'off',
    'react/no-this-in-sfc': 'off',
    'react/no-unknown-property': 'error',
    'react/prefer-es6-class': 'error',
    'react/react-in-jsx-scope': 'off',
    'react/refs': 'off',
    'react/self-closing-comp': 'error',
    'react/set-state-in-effect': 'off',

    // react-hooks
    'react/rules-of-hooks': 'error',
    'react/exhaustive-deps': 'warn',

    // typescript
    'typescript/no-empty-object-type': 'error',
    'typescript/no-explicit-any': 'error',
    'typescript/no-import-type-side-effects': 'error',
    'typescript/no-invalid-void-type': 'error',
    'typescript/no-non-null-assertion': 'error',
    'typescript/no-wrapper-object-types': 'error',

    // temporarily disabled
    'typescript/consistent-return': 'off',
    'typescript/no-base-to-string': 'off',
    'typescript/no-extraneous-class': 'off',
    'typescript/no-unnecessary-boolean-literal-compare': 'off',
    'typescript/no-unsafe-type-assertion': 'off',
    'typescript/unbound-method': 'off',

    // 'typescript/explicit-function-return-type': 'error',
    // 'typescript/explicit-module-boundary-types': 'error',
    // 'typescript/no-dynamic-delete': 'error',

    'typescript/restrict-template-expressions': [
      'off',
      {
        allow: [],
        allowNullish: false,
        allowAny: false,
        allowRegExp: false
      }
    ]

    // 'typescript/strict-boolean-expressions': [
    //   'error',
    //   {
    //     allowAny: true,
    //     allowNullableBoolean: true,
    //     allowNullableEnum: true,
    //     allowNullableNumber: true,
    //     allowNullableObject: true,
    //     allowNullableString: true,
    //     allowNumber: true,
    //     allowString: true
    //   }
    // ]
  },
  overrides: [
    {
      files: ['**/__tests__/**'],
      rules: {
        'typescript/no-non-null-assertion': 'off'
      }
    }
  ]
});
