/* eslint camelcase: 0, no-underscore-dangle: 0, import/prefer-default-export: 0 */
// @flow
import * as R from 'ramda';
import * as U from 'karet.util';

const handlers = {
  '/api_start2': (args) => {
    console.log('api_start2 with args =', args);
  }
};

const handleNextEvent = atom => req => {
  console.log('handleNextEvent', req, atom);
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

const latestIn = U.view('latest');

// Expose handler for use with webview
export const initializeObserver = (atom: *) => {
  console.log('initialize observer for atom', atom);
  latestIn(atom).observe(handleNextEvent(atom));
};

