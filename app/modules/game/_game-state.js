/* eslint-disable import/prefer-default-export, no-underscore-dangle */
// @flow
import * as R from 'ramda';
import * as U from 'karet.util';
import * as L from 'partial.lenses';

import handlers from './state/index';

const notNil = R.complement(R.isNil);

const handleNextEvent = (atom, gameStatus) => req => {
  const { path } = req;

  if (!handlers[path]) {
    return;
  }

  const f = R.prop(path, handlers);
  const xs = [req, atom, gameStatus];

  R.when(notNil,
    R.apply(R.__, xs),
    f);
};

const latestIn = U.view(['api', 'latest', L.define({ path: '' })]);
const stateIn = U.view('state');
const statusIn = U.view(['status']);

/**
 * Initializes an observer that will call the appropriate handlers for
 * incoming API data.
 */
export const initializeObserver = (atom: *) =>
  latestIn(atom).observe(handleNextEvent(stateIn(atom), statusIn(atom)));

