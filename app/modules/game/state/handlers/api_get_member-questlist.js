import * as L from 'partial.lenses';
import * as R from 'ramda';

import { quest, questList } from '../_templates';
import { collectWithIndex } from '../meta';

export const optic = ks => L.pick({
  quests: ['quests', 'list'].concat(ks ? R.apply(L.props, ks) : []),
  questView: ['views', 'quests']
});

/**
 * Gets the individual quest items, as well as the quest list view.
 */
export default ({ path, body }, state) => {
  const quests = collectWithIndex(['api_list', L.elems, L.pick(quest)], body);
  const questView = L.get(L.pick(questList), body);
  const ks = R.keys(quests);

  const o = optic(ks);
  const result = { quests, questView };

  state.modify(L.set(o, result));

  return state;
};
