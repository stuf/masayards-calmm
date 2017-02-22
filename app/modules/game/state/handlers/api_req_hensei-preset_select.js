import * as L from 'partial.lenses';
import { fleet } from '../_templates';

export const optic = id => ['fleets', `${id}`];

/**
 * Load fleet preset
 */
export default ({ path, body }, state) => {
  const f = L.get(L.pick(fleet), body);
  state.modify(L.set(optic(f.id), f));
  return state;
};
