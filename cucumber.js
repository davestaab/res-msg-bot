module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: ['features/**/*.ts'],
    formatOptions: {
      snippetInterface: "async-await"
    },
    format: ['html:cucumber-report.html'],
    publishQuiet: true,
  }
};
