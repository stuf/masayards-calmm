/* eslint-disable global-require, import/no-dynamic-require */
describe('modules/app-ui', () => {
  describe('components', () => {
    const suites = [
      'game',
      'ui',
      'main'
    ];
    suites.forEach(s => require(`./${s}.suite`));
  });
});
