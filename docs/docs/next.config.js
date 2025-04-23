const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.jsx',
  whiteListTagsStyling: ['table', 'thead', 'tbody', 'tr', 'th', 'td'],
});

module.exports = withNextra();
