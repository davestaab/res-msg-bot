module.exports = {
  env: {
    node: true,
  },
  extends: [
    // 'plugin:vue/essential',
    '@vue/eslint-config-typescript/recommended',
    // '@vue/eslint-config-prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    project: './tsconfig.json',
    extraFileExtensions: ['.cjs']
  },
  rules: {
    // 'prettier/prettier': [
    //   'warn',
    //   {
    //     tabWidth: 2,
    //     singleQuote: true,
    //     printWidth: 100,
    //     endOfLine: 'auto',
    //   },
    // ],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-use-before-define': ['error', 'nofunc'],
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { ignoreRestSiblings: true, varsIgnorePattern: '_.*' },
    ],
    '@typescript-eslint/no-floating-promises': ['error'],
  },
};
