module.exports = {
  singleQuote: true,
  semi: false,
  trailingComma: 'all',
  importOrder: [
    '^@web/(.*)$',
    '^@shared/(.*)$',
    '^@backend/(.*)$',
    '^@mantine/(.*)$',
    '<THIRD_PARTY_MODULES>',
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  scaffdogProject: './.scaffdog',
}
