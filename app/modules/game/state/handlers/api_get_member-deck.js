import * as R from 'ramda';
import * as L from 'partial.lenses';
import { fleet } from '../_templates';

/**
 * Gets the new state of the player fleets
 */
export default ({ path, body }, state) => {
  const fleets = L.collect([L.elems, L.pick(fleet)], body);
  state.modify(L.set('fleets', R.indexBy(R.prop('id'), fleets)));
};
