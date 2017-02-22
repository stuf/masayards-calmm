import * as L from 'partial.lenses';
import { fleet } from '../_templates';

/**
 * Load fleet preset
 */
export default ({ path, body }, state) => {
  const f = L.get(L.pick(fleet), body);

  state.modify(L.set(['fleets', `${f.id}`], f));
};
