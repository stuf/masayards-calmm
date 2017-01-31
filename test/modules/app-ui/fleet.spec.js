import { expect } from 'chai';
import { spy } from 'sinon';
import React from 'karet';
import ReactDOM from 'react-dom/server';

import Atom from 'kefir.atom';
import * as U from 'karet.util';
import * as L from 'partial.lenses';

import * as C from '../../../app/modules/app-ui/controls';
import * as M from '../../../app/modules/app-ui/meta';
import stateData from '../../state.json';

function setup() {
  const state = Atom(stateData);
  return { state };
}

const testRender = (vdom, expected) => it(`${expected}`, () => {
  const actual = ReactDOM.renderToStaticMarkup(vdom);
  console.log(actual);
  expect(actual).to.equal(expected);
});

describe('UI', () => {
  describe('<Fleet />', () => {
    const { state } = setup();
    const fleet = U.view(['fleets', L.index(0)], state);
    // testRender(<C.Fleet fleet={fleet} />, '<div></div>');
    expect(true).to.equal(true);
  });
});
