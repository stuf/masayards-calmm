/**
 * @fileoverview
 *  Define a set of functionals that will be used for normalizing the API data.
 *
 * @flow
 */
import { cond, inc, is, prop, always, compose, head, identity, T } from 'ramda';
import * as L from 'partial.lenses';
import { materialTypes as mats } from './_templates';

// Normalizer functions for elements describing resource state

/**
 * Transformation function for a list of numbers describing a resource state
 */
export const numberNormalizer = (n: number, i: number) => ({
  id: inc(i),
  type: prop(inc(i), mats),
  value: n
});

/**
 * Transformation function for a list of objects describing a resource state
 */
export const objectNormalizer = ({ api_id, api_value }: { api_id: number, api_value: number }) => ({
  id: api_id,
  type: prop(api_id, mats),
  value: api_value
});

/**
 * Simple conditional checker for deciding on which normalizing function to use
 */
export const decideNormalizer = cond([
  [is(Number), always(numberNormalizer)],
  [is(Object), always(objectNormalizer)],
  [T, always(identity)]
]);

const normalizerLens = n => [L.define([]), L.elems, L.normalize(n)];

/**
 * Compose a function that will take the `head` of a list of elements of any type,
 * that will return a normalizing function appropriate for that function.
 *
 * If the the type is something that we don't know how to handle, it will return
 * its identity instead.
 */
export const chooseNormalizer = compose(
  normalizerLens,
  decideNormalizer,
  head
);
