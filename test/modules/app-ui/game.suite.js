import { expect } from 'chai';
import React from 'karet';

import * as R from 'ramda';

import { Fleet, Ship } from '../../../app/modules/app-ui/components/game';
import {
  Fleet as FleetM,
  Ship as ShipM
} from '../../../app/modules/app-ui/components/game/meta';
import { setup, render } from '../setup';

type Tuple<A, B> = [A, B];
type TupleList<A, B> = Array<Tuple<A, B>>;

describe('game', () => {
  let state;
  beforeEach(() => {
    const s = setup();
    state = s.state;
  });

  describe('Ship', () => {
    const ids: TupleList<number, string> =
      [
        [1, '吹雪', 49],
        [161, 'Верный', 46]
      ];

    it('should display a Ship component', () => {
      const checkContains = ([id, name]) =>
        expect(render(<Ship ship={ShipM.getCombined(state, id)} />).find('.ship__name').text())
          .to.contain(name);

      R.forEach(checkContains, ids);
    });

    // it('should indicate critical health', () => {
    // });

    it('should indicate morale', () => {
      const checkMorale = ([id, name, morale]) =>
        expect(render(<Ship ship={ShipM.getCombined(state, id)} />).find('.ship__morale').text())
          .to.contain(morale);

      R.forEach(checkMorale, ids);
    });

    // it('should indicate low supplies', () => {
    // });
  });

  describe('Fleet', () => {
    const fleetWithId = i => FleetM.viewIn(i, state);

    it('should contain the correct number of Ships', () => {
      const fleets: TupleList<number, number> =
        [
          [1, 6],
          [2, 4],
          [4, 6]
        ];

      const checkFleet = ([id, shipCount]) =>
        expect(render(<Fleet view={fleetWithId(id)} />).find('.ship'))
          .to.have.length(shipCount);

      R.forEach(checkFleet, fleets);
    });

    it('should contain the Fleet\'s name', () => {
      const wrapper = render(<Fleet view={fleetWithId(1)} />);
      expect(wrapper.find('.fleet__name').text()).to.equal('Anti-Bus');
    });

    it('should display the Fleet\'s correct state (idle/on expedition/returned)', () => {
      const states: TupleList<number, string> =
        [
          [1, 'idle'],
          [2, 'on expedition'],
          [3, 'returned']
        ];

      const checkEq = ([id, str]) =>
        expect(render(<Fleet view={fleetWithId(id)} />).find('.fleet__state').text())
          .to.equal(str);

      R.forEach(checkEq, states);
    });
  });
});
