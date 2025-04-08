/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  plugins: ['vue', 'prettier'],
  rules: {
    'vue/no-v-html': 'off',
    'no-console': process.env.APP_NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.APP_NODE_ENV === 'production' ? 'warn' : 'off',
    'prettier/prettier': 'error',
    // allow async-await
    'generator-star-spacing': 'off',
    eqeqeq: 'off',
    'prefer-promise-reject-errors': 'off',
    // 强制使用单引号
    quotes: ['error', 'single'],
    // 强制不使用分号结尾
    semi: ['error', 'never'],
    'prefer-const': 'off',
    'no-underscore-dangle': 'off',
    'space-before-function-paren': 'off',
    'no-prototype-builtins': 'off',
    curly: 'off',
    indent: 'off',
    camelcase: 'off',
    'vue/no-reserved-keys': 'off',
    'no-return-await': 'off',
    'global-require': 'off',
    'vue/html-self-closing': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/name-property-casing': 'off',
    'vue/attributes-order': ['warn'],
    'vue/singleline-html-element-content-newline': 'off',
    'vue/attribute-hyphenation': 'off',
    'vue/v-on-event-hyphenation': 'off',
    'vue/multi-word-component-names': 'off'
  }
}
