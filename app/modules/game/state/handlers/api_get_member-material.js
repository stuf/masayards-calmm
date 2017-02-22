import * as L from 'partial.lenses';
import { materials } from '../_templates';

export default ({ path, body }, state) => {
  state.modify(L.set('resources', L.collect(materials, body)));
};
