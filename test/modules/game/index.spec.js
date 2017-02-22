/* eslint-disable global-require, import/no-dynamic-require */
describe('modules/game', () => {
  const suites = [
    'network-handler',
    'state-handler',
    'controls',
    'meta'
  ];

  suites.forEach(s => require(`./${s}.suite`));
});
