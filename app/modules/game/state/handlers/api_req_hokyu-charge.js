import * as L from 'partial.lenses';

import { ship, materials } from '../_templates';
import { collectWithIndex, keysToString } from '../meta';

export default ({ path, body }, state) => {
  const resources = collectWithIndex(['api_material', L.elems, materials], body);
  const ships = collectWithIndex(['api_ship', L.elems, L.pick(ship)], body);

  const optic = L.pick({
    resources: ['resources', L.props(keysToString(resources))],
    shipEntities: ['ships', 'player', L.props(keysToString(ships))]
  });

  state.modify(L.set(optic, { resources, ships }));
};
