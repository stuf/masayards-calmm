import * as L from 'partial.lenses';
import * as R from 'ramda';

import { baseShip, equipment } from '../_templates';
import { collectWithIndex } from '../meta';

export const optic = L.pick({
  status: 'status',
  ships: ['ships', 'base'],
  equipment: ['equipment', 'base']
});

/**
 * Gets the initial game data on start
 */
export default ({ path, body }, state) => {
  const result = {
    status: 'starting',
    ships: collectWithIndex(['api_mst_ship', L.elems, L.pick(baseShip)], body),
    equipment: collectWithIndex(['api_mst_slotitem', L.elems, L.pick(equipment)], body)
  };

  state.modify(L.set(optic, result));

  return state;
};
