/* eslint camelcase: 0, no-underscore-dangle: 0, import/prefer-default-export: 0 */
/**
 * @fileoverview
 *  Process incoming API data for use in the application.
 *
 * @flow
 */
import * as R from 'ramda';
import * as U from 'karet.util';
import * as L from 'partial.lenses';

import {
  basicProfileIn,
  materialsIn,
  fleetsIn
} from './_templates';

type EventArgs = { path: string, body: *, postBody: * };
type Atom = *;
type EventHandler = (args: EventArgs, atom: Atom) => void;
type EventHandlerMap = { [path: string]: EventHandler };
type CallHandler = (atom: Atom) => (req: EventArgs) => void;

const headWhenArray = R.when(R.is(Array), R.head);

// State merging monoid
const MergeState = {
  empty: () => ({}),
  concat: (a, b) => ({ ...a, ...b })
};

const getShips =
  R.compose(R.map(headWhenArray),
            R.sortBy(R.prop('api_id')),
            L.get);

// Define views
const view = {
  latestIn: U.view(['api', 'latest']),
  stateIn: U.view('state')
};

/**
 * Event handler map
 */
const handlers: EventHandlerMap = {
  '/api_port/port': ({ path, body, postBody }, atom) =>
    atom.view('state').modify(() =>
      L.merge(MergeState, L.elems, [
        { player: L.get([basicProfileIn('api_basic')], body) },
        { resources: L.collect([materialsIn('api_material')], body) },
        { fleets: L.collect([fleetsIn('api_deck_port')], body) },
        { ships: getShips(['api_ship', L.normalize(R.sortBy(R.prop('api_id')))], body) }
      ]))
};

/**
 * @todo Rewrite me, this hurts my eyes.
 */
const handleEvent: CallHandler = atom => req => {
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

export const initializeObserver = (atom: *) =>
  view.latestIn(atom)
      .observe(handleEvent(atom));
