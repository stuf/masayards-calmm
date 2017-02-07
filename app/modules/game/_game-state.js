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

const latestIn = U.view(['api', 'latest', L.define({ path: ''})]);
const stateIn = U.view('state');

// Expose handler for use with webview
export const initializeObserver = (atom: *) => {
  const latest = latestIn(atom);
  atom.log('GLOBAL (game state)');
  return latest.observe(handleNextEvent(stateIn(atom)));
};

