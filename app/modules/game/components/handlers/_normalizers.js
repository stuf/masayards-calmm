/**
 * @fileoverview
 *  Define a set of functions that will be used for normalizing the API data.
 *
 * @flow
 */
import * as R from 'ramda';
import * as L from 'partial.lenses';
import { materialTypeList as mats } from './_templates';

// Normalizer functions for elements describing resource state

/**
 * Transformation function for a list of numbers describing a resource state
 */
export const numberArrayNormalizer = (n: number, i: number) => ({
  id: R.add(1, i),
  type: mats[R.add(1, i)],
  value: n
});

/**
 * Transformation function for a list of objects describing a resource state
 */
export const objectArrayNormalizer = ({ api_id, api_value }: { api_id: number, api_value: number }) => ({
  id: api_id,
  type: mats[api_id],
  value: api_value
});

/**
 * Simple conditional checker for deciding on which normalizing function to use
 */
export const decideNormalizer = R.cond([
  [R.is(Number), R.always(numberArrayNormalizer)],
  [R.is(Object), R.always(objectArrayNormalizer)],
  [R.T, R.always(R.identity)]
]);

const normalizerLens = n => [L.define([]), L.elems, L.normalize(n)];

/**
 * Compose a function that will take the `head` of a list of elements of any type,
 * that will return a normalizing function appropriate for that function.
 *
 * If the the type is something that we don't know how to handle, it will return
 * its identity instead.
 */
export const chooseNormalizer = R.compose(
  normalizerLens,
  decideNormalizer,
  R.head
);
