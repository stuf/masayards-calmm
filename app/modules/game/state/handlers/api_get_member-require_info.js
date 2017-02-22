import * as L from 'partial.lenses';
import * as R from 'ramda';

import { getLUT } from '../meta';
import { constructionDock, equipment, item } from '../_templates';

const idProp = R.prop('id');

const optic = L.pick({
  equipment: L.pick({
    entities: ['equipment', 'player'],
    lookup: ['lookup', 'equipment', 'player'],
    count: ['count', 'equipment', L.index(0)]
  }),
  constructionDocks: L.pick({
    entities: 'constructionDocks',
    count: ['count', 'constructionDocks']
  }),
  items: 'items',
});

/**
 * Gets the basic state of the player's "consumables"; construction docks,
 * usable items and equipment list.
 */
export default ({ path, body }, state) => {
  const eq = L.collect(['api_slot_item', L.elems, L.pick(equipment)], body);
  const constructionDocks = L.collect(['api_kdock', L.elems, L.pick(constructionDock)], body);

  const result = {
    equipment: {
      entities: R.indexBy(idProp, eq),
      lookup: getLUT(eq, 'id', 'equipmentId'),
      count: R.length(eq)
    },
    constructionDocks: {
      entities: R.indexBy(idProp, constructionDocks),
      count: R.length(constructionDocks)
    },
    items: R.indexBy(idProp, L.collect(['api_useitem', L.elems, L.pick(item)], body)),
  };

  state.modify(L.set(optic, result));
};
