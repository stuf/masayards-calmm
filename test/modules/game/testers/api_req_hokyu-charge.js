import { expect } from 'chai';
import * as L from 'partial.lenses';

const resourceProps = ['1', '2', '3', '4'];

export default (s, optic, state = s.view(optic({ resourceProps })).get()) => {
  expect(L.collect(['resources', L.props(...resourceProps), L.values, L.props('id', 'value')], state))
    .to.eql([
      { id: 1, value: 10000 },
      { id: 2, value: 20000 },
      { id: 3, value: 30000 },
      { id: 4, value: 40000 }
    ]);
};
