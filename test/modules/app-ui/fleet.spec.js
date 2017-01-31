import { expect } from 'chai';
import { spy } from 'sinon';
import cheerio from 'cheerio';
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

const render = vdom => {
  const html = ReactDOM.renderToStaticMarkup(vdom);
  return cheerio.load(html).root();
};

describe('UI', () => {
  describe('<Fleet />', () => {
    const { state } = setup();
    const fleets = U.view('fleets', state);
    const ships = U.view('ships', state);

    const fleetAtIndex = i => U.view(L.index(i), fleets);

    it('should contain the correct number of Ships', () => {
      const wrapper1 = render(<C.Fleet fleet={fleetAtIndex(0)} ships={ships} />);
      expect(wrapper1.find('.item')).to.have.length(4);

      const wrapper4 = render(<C.Fleet fleet={fleetAtIndex(3)} ships={ships} />);
      expect(wrapper4.find('.item')).to.have.length(6);
    });

    it('should display the Fleet\'s correct state (idle/on expedition/returned)', () => {
      const idleWrapper = render(<C.Fleet fleet={fleetAtIndex(0)} ships={ships} />);
      expect(idleWrapper.find('.state').text()).to.equal('idle');

      const onExpWrapper = render(<C.Fleet fleet={fleetAtIndex(1)} ships={ships} />);
      expect(onExpWrapper.find('.state').text()).to.equal('on expedition');

      const returnedWrapper = render(<C.Fleet fleet={fleetAtIndex(2)} ships={ships} />);
      expect(returnedWrapper.find('.state').text()).to.equal('returned');
    });
  });
});
