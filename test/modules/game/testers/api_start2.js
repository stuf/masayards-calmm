import { expect } from 'chai';
import * as L from 'partial.lenses';

export default (s, optic, state = s.get()) => {
  expect(L.get('status', state)).to.equal('starting');
  expect(L.collect(['ships', 'base', L.values], state)).to.have.length.within(600, 800);
  expect(L.collect(['equipment', 'base', L.values], state)).to.have.length.within(200, 400);
};
