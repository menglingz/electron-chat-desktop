module.exports = {
  root: true,
  extends: [
    'standard',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    // 'plugin:vue/essential',
    'plugin:vue/vue3-recommended',
  ],
  plugins: ['vue'],
  rules: {
    'arrow-body-style': 'off',
    'implicit-arrow-linebreak': 'off',
    'function-paren-newline': 'off',
    'arrow-parens': 'off',
    '@typescript-eslint/naming-convention': 'off',
    '@typescript-eslint/no-explicit-any': 'off', // 禁用 @typescript-eslint/no-explicit-any 规则
    'vue/multi-word-component-names': 'off', // 禁用 vue/multi-word-component-names 规则
    '@typescript-eslint/no-var-requires': 'off',
    'vue/html-closing-bracket-spacing': 'off',
    'vue/html-self-closing': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    camelcase: 'off',
    'import/no-duplicates': 'off',
    'vue/no-dupe-keys': 'off',
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx', '*.vue'],
      rules: {
        'no-unused-vars': ['off'],
        'vue/max-attributes-per-line': 'off',
        'no-undef': ['off'],
      },
    },
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  env: {
    node: true,
  },
};
