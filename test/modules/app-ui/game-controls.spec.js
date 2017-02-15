import { expect } from 'chai';
import { spy } from 'sinon';
import React from 'karet';

import * as R from 'ramda';
import * as U from 'karet.util';
import * as L from 'partial.lenses';

import { Fleet, Ship } from '../../../app/modules/app-ui/components/game/index';
import {
  Fleet as FleetM,
  Ship as ShipM
} from '../../../app/modules/app-ui/components/game/meta';
import { setup, render } from '../setup';

type Tuple<A, B> = [A, B];
type TupleList<A, B> = Array<Tuple<A, B>>;

describe('App UI Controls', () => {
  describe('<Ship />', () => {
    const { state } = setup();

    it('should display a Ship component', () => {
      const ids: TupleList<number, string> =
        [
          [1, '吹雪'],
          [161, 'Верный']
        ];

      const checkContains = ([id, name]) =>
        expect(render(<Ship ship={ShipM.getCombined(state, id)} />).find('.ship .name').text())
          .to.contain(name);

      R.forEach(checkContains, ids);
    });
  });

  describe('<Fleet />', () => {
    const { state } = setup();

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
      expect(wrapper.find('.fleet-name').text()).to.equal('Anti-Bus');
    });

    it('should display the Fleet\'s correct state (idle/on expedition/returned)', () => {
      const states: TupleList<number, string> =
        [
          [1, 'idle'],
          [2, 'on expedition'],
          [3, 'returned']
        ];

      const checkEq = ([id, str]) =>
        expect(render(<Fleet view={fleetWithId(id)} />).find('.fleet-state').text())
          .to.equal(str);

      R.forEach(checkEq, states);
    });
  });
});
