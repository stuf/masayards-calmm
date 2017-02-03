// @flow
import * as L from 'partial.lenses';
import * as U from 'karet.util';
import * as R from 'ramda';

// @todo Put these two together into one view instead
export const capitalize = (s: string) => R.join('', [R.toUpper(R.head(s)), R.tail(s)]);

export const fromKey = (key: string) => L.pick({
  count: [key, L.define([]), L.normalize(R.length)],
  max: ['player', `max${capitalize(key)}`]
});

export const showCurMax = (key: string, state: *) =>
  U.compose(U.join('/'), U.values, U.view(fromKey(key)))(state);

export const stateIn = U.view(['game', 'state']);
