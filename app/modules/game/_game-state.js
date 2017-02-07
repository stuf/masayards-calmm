/* eslint camelcase: 0, import/prefer-default-export: 0 */
// @flow
import * as R from 'ramda';
import * as U from 'karet.util';
import * as L from 'partial.lenses';

import handlers from './state/index';

const handleNextEvent = atom => req => {
  const { path } = req;
  const f = R.prop(path, handlers);
  const xs = [req, atom];

  if (f) {
    console.groupCollapsed('Calling function with xs = ', xs);
    console.log('Should call: f(...xs) where f =', f, ', xs =', xs);
    console.groupEnd();
    f(...xs);
  }
};

const latestIn = U.view(['api', 'latest', L.define({ path: '' })]);
const stateIn = U.view('state');

/**
 * Initializes an observer that will call the appropriate handlers for
 * incoming API data.
 *
 * @todo Investigate: Could `.scan` be used instead of `.observe` here?
 */
export const initializeObserver = (atom: *) =>
  latestIn(atom).observe(handleNextEvent(stateIn(atom)));

