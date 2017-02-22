import { expect } from 'chai';
import * as L from 'partial.lenses';

export default (s, optic, state = s.view(optic).get()) => {
  const p = L.get('player', state);
  expect(p.name).to.equal('ベガっち');
  expect(p.rank).to.be.above(3);
  expect(p.fleets).to.be.within(1, 4);
  expect(p.constructionDocks).to.be.within(2, 4);
  expect(p.reparationDocks).to.be.within(2, 4);
};
