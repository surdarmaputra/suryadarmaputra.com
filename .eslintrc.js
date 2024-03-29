module.exports = {
  extends: ['@remix-run/eslint-config'],
  plugins: ['simple-import-sort'],
  rules: {
    '@typescript-eslint/comma-dangle': ['error', 'always-multiline'],
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'semi',
          requireLast: true,
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false,
        },
      },
    ],
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/semi': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'no-console': 'warn',
    'no-multi-spaces': [
      'error',
      {
        ignoreEOLComments: true,
        exceptions: {
          VariableDeclarator: true,
        },
      },
    ],
    'no-multiple-empty-lines': [
      'error',
      {
        max: 1,
        maxBOF: 0,
        maxEOF: 0,
      },
    ],
    'no-trailing-spaces': 'error',
    quotes: ['error', 'single', { avoidEscape: true }],
    'react/jsx-curly-brace-presence': [
      'error',
      {
        props: 'never',
        children: 'never',
      },
    ],
    'react/jsx-sort-props': 'error',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
};
