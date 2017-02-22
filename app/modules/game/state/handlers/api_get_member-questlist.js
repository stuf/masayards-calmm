import * as L from 'partial.lenses';
import * as R from 'ramda';

import { quest, questList } from '../_templates';
import { collectWithIndex, keysToString } from '../meta';

/**
 * Gets the individual quest items, as well as the quest list view.
 */
export default ({ path, body }, state) => {
  const quests = collectWithIndex(['api_list', L.elems, L.pick(quest)], body);
  const questView = L.get(L.pick(questList), body);
  const ks = keysToString(quests);

  const optic = L.pick({
    quests: ['quests', 'list', R.apply(L.props, ks)],
    questView: ['views', 'quests']
  });

  const result = { quests, questView };

  state.modify(L.set(optic, result));

  return state;
};
