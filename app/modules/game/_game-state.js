/* eslint-disable import/prefer-default-export */
// @flow
import * as R from 'ramda';
import * as U from 'karet.util';
import * as L from 'partial.lenses';

import handlers from './state/index';

const handleNextEvent = atom => req => {
  const { path } = req;

  if (!handlers[path]) {
    return;
  }

  const f = R.prop(path, handlers);
  const xs = [req, atom];

  if (f) {
    f(...xs);
  }
};

const latestIn = U.view(['api', 'latest', L.define({ path: '' })]);
const stateIn = U.view('state');

/**
 * Initializes an observer that will call the appropriate handlers for
 * incoming API data.
 */
export const initializeObserver = (atom: *) =>
  latestIn(atom).observe(handleNextEvent(stateIn(atom)));

