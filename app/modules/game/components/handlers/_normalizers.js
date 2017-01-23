/**
 * @fileoverview
 *  Define a set of functionals that will be used for normalizing the API data.
 *
 * @flow
 */
import {
  inc,
  map,
  prop,
  compose,
  replace,
  toPairs,
  fromPairs
} from 'ramda';
import { materialTypes as mats } from './_objects';

type Tuple<A, B> = [A, B];

type NormalizeTuple<A, B> = (pair: Tuple<A, B>) => Tuple<A, B>;

const normalizePairFromApi: NormalizeTuple<string, *> = ([k, v]) =>
  [replace(/^api_/, '', k), v];

export const normalizeObjectKeys =
  compose(fromPairs, map(normalizePairFromApi), toPairs);

export const normalizeMaterialList = (v: number, i: number) => ({
  type: prop(inc(i), mats),
  value: v
});
