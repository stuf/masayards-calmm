import * as L from 'partial.lenses';
import * as R from 'ramda';
import { expect } from 'chai';

import stateData from '../state.json';

describe('Game State', () => {
  describe('Ships', () => {
    const ids = [138, 685, 33, 53];
    const ships = L.get('ships', stateData);

    it('should get ships with an array of ids (basic partial lens getter)', () => {
      const fleets = L.get('fleets', stateData);
      const result = L.get(L.filter(x => ids.includes(x.id)), ships);

      expect(result.length).to.equal(ids.length);
    });

    it('should get ships with an array of ids (curried partial lens)', () => {
      const fleets = L.get('fleets', stateData);
      const result = L.get(L.filter(R.any(R.prop('id'))));
    });
  });
});
