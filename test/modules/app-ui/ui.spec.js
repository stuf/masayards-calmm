import { expect } from 'chai';
import React from 'karet';

import * as R from 'ramda';

import { setup, render } from '../setup';
import { Sidebar, StatusBar } from '../../../app/modules/app-ui/components';

describe('Application UI Components', () => {
  let state;
  let fullState;
  beforeEach(() => {
    const s = setup();
    state = s.state;
    fullState = s.full;
  });

  describe('MainView', () => {
    // it('should not derp', () => {
    //   expect(true).to.be.true;
    // });
  });

  describe('Sidebar', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = render(<Sidebar atom={fullState} />);
    });

    it('should contain the correct number of docks', () => {
      const items = [
        ['.section--repairdocks', [1, 4]],
        ['.section--constructiondocks', [1, 4]]
      ];

      const check = ([sel, [r1, r2]]) =>
        expect(wrapper.find(`${sel} .dock-list__item`).length).to.be.within(r1, r2);

      R.map(check, items);
    });

    it('should display the player\'s resources', () => {
      const items = [
        'fuel',
        'ammo',
        'steel',
        'bauxite'
      ];

      const check = k => {
        const _it = wrapper.find(`.resource--${k}`);
        expect(_it.find('.kvf--key').text()).to.equal(k);
        expect(_it.find(parseInt('.kvf--value', 10)).text()).to.be.within(0, 300000);
      };

      R.forEach(check, items);
    });
  });

  describe('TitleBar', () => {
    // it('should not derp', () => {
    //   expect(true).to.be.true;
    // });
  });

  describe('StatusBar', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = render(<StatusBar atom={fullState} />);
    });

    it('should display the player\'s name', () => {
      expect(wrapper.find('.player-name').text()).to.equal('ベガっち');
    });

    it('should display the player\'s level', () => {
      expect(wrapper.find('.player-level').text()).to.equal('Level: 104');
    });

    it('should display the player\'s ship and equipment count', () => {
      const items = [
        ['.player-shipstatus', 'Ships: 186 / 200'],
        ['.player-equipmentstatus', 'Equipment: 847 / 897']
      ];
      const check = ([sel, val]) =>
        expect(wrapper.find(sel).text()).to.equal(val);

      R.map(check, items);
    });
  });
});
