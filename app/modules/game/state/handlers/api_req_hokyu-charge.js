import * as L from 'partial.lenses';
import * as R from 'ramda';

import { ship, materials } from '../_templates';
import { collectWithIndex } from '../meta';

export const optic = ({ resIdLens }) =>
  L.pick({
    resources: ['resources'].concat(resIdLens || [])
  });

export default ({ path, body }, state) => {
  const resources = collectWithIndex(['api_material', materials], body);
  const shipEntities = collectWithIndex(['api_ship', L.elems, L.pick(ship)], body);

  const o = L.pick({
    resources: ['resources', L.props(...R.keys(resources))],
    shipEntities: ['ships', 'player', L.props(...R.keys(shipEntities))]
  });

  const result = { resources, shipEntities };

  state.modify(L.set(o, result));

  return state;
};
