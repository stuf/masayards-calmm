/**
 * @fileoverview
 *  Define a set of functions that will be used for normalizing the API data.
 *
 * @flow
 */
import * as R from 'ramda';
import * as L from 'partial.lenses';
import { materialTypeList as mats } from './_templates';

// Missions/expeditions
export const Simple = {
  asBool: (x: *) => R.equals(1),
  asPair: (a: *, b: *) => [a, b]
};

export const N = {
  asBool: L.normalize(Simple.asBool),
  asPair: L.normalize(Simple.asPair)
};

export const Expeditions = {
  normalizer: (a: *) => ({ state: a[0], missionId: a[1], completionTime: a[2]})
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
