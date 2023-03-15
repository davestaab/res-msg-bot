module.exports = {
  default: {
    // requireModule: ['ts-node/register'],
    import: ['dist/features/**/*.js'],
    formatOptions: {
      snippetInterface: 'async-await',
    },
    format: ['html:cucumber-report.html'],
    publishQuiet: true,
  },
};
