/**
 * @fileoverview
 *  Define a set of functions that will be used for normalizing the API data.
 *
 * @flow
 */
import * as R from 'ramda';
import * as L from 'partial.lenses';
import {
  materialTypeList as mats,
  QuestState,
  QuestProgress,
  QuestCategory
} from './_templates';

// Missions/expeditions
export const Simple = {
  asBool: R.equals(1),
  normalizeLinebreaks: R.replace(/<br ?\/?>/g, '\n')
};

export const asBool = L.normalize(Simple.asBool);

/**
 * In what way do we want to "pre-normalize" data from the API _before_ it's
 * consumed in the handling function?
 *
 * A common use case where this becomes handy is ensuring that some values should
 * be handled as numbers, but they're passed in as strings.
 */
export const Events: { [event: string]: * } = {
  '/api_req_mission/start': ''
};

export const Expeditions = {
  normalizer: (a: *) => ({ state: a[0], missionId: a[1], completionTime: a[2] })
};

// Normalizer for quest states

export const Quests = {
  questStateNormalizer: (id: number) => QuestState.get(id),
  questProgressNormalizer: (id: number) => QuestProgress.get(id),
  questCategoryNormalizer: (id: number) => QuestCategory.get(id)
};

// Normalizer functions for elements describing resource state

export const Materials = {
  numberArrayNormalizer: (n: number, i: number) => ({
    id: R.add(1, i),
    type: mats[i],
    value: n
  }),
  objectArrayNormalizer: ({ api_id, api_value }: { api_id: number, api_value: number }) => ({
    id: api_id,
    type: mats[R.subtract(api_id, 1)],
    value: api_value
  })
};

export const decideNormalizer = R.cond([
  [R.is(Number), R.always(Materials.numberArrayNormalizer)],
  [R.is(Object), R.always(Materials.objectArrayNormalizer)],
  [R.T, R.always(R.identity)]
]);

const normalizerLens = n => [L.define([]), L.elems, L.normalize(n)];

/**
 * Take the first element from the given list of data to choose the
 * correct normalizing function from.
 */
export const chooseNormalizer = R.compose(
  normalizerLens,
  decideNormalizer,
  R.head
);
