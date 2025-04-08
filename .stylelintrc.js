module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-rational-order',
    'stylelint-config-recommended-vue'
  ],
  overrides: [
    {
      files: ['**/*.less'],
      customSyntax: 'postcss-less'
    }
  ],
  rules: {
    // 'declaration-colon-space-after': 'always-single-line', // 在单行声明的冒号前允许有空格
    // 'declaration-colon-space-before': 'never', // 冒号前禁止空格
    'font-family-no-missing-generic-family-keyword': null,
    'font-family-name-quotes': null,
    'no-invalid-double-slash-comments': null, // 允许使用双斜杠注释
    'at-rule-no-unknown': null, // 允许自定义less变量
    'color-function-notation': null,
    'selector-class-pattern': null,
    'rule-empty-line-before': [
      'always',
      {
        ignore: ['after-comment', 'first-nested']
      }
    ],
    'value-no-vendor-prefix': [
      true,
      {
        ignoreValues: ['box']
      }
    ],
    'selector-type-no-unknown': [
      true,
      {
        ignoreTypes: ['/when|not/']
      }
    ],
    'media-feature-name-no-vendor-prefix': null
  }
}
