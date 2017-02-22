/* eslint-disable global-require, import/no-dynamic-require */
import { expect } from 'chai';
import { spy } from 'sinon';
import { require as reqlib } from 'app-root-path';
import path from 'path';

import { setup, render } from '../setup';

const mockDir = path.join('..', '..', 'mock');
const testerDir = path.join(__dirname, 'testers');

describe('state handler', () => {
  const items = [
    { apiPath: '/api_start2', file: 'api_start2' },
    { apiPath: '/api_port/port', file: 'api_port-port' },
    { apiPath: '/api_get_member/questlist', file: 'api_get_member-questlist' }
  ];

  items.forEach(({ apiPath, file }) => {
    const { state } = setup();
    const json = require(path.join(mockDir, `${file}.json`));
    const test = require(path.join(testerDir, file));
    const handler = reqlib(`app/modules/game/state/handlers/${file}`);

    it(apiPath, () => {
      const s = handler.default(json, state);
      test(s, handler.optic);
    });
  });
});
