module.exports = {
  root: true,
  env: {
    node: true,
    browser: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
    'plugin:prettier/recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'prettier/prettier': [
      'error',
      {
        packageManager: 'yarn',
        semi: false,
        singleQuote: true,
        bracketSpacing: true,
        tabWidth: 2,
        useTabs: false,
        endOfLine: 'lf'
      }
    ]
  }
}
