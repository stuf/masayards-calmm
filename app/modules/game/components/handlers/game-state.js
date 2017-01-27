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
  shipsIn,
  fleetsIn,
  equipmentListIn,
  constructionDocksIn,
  itemsIn
} from './_templates';

type EventArgs = { path: string, body: *, postBody: * };
type Atom = *;
type EventHandler = (args: EventArgs, atom: Atom) => void;
type EventHandlerMap = { [path: string]: EventHandler };
type CallHandler = (atom: Atom) => (req: EventArgs) => void;

// Define views
const view = {
  latestIn: U.view(['api', 'latest']),
  stateIn: U.view('state')
};

/**
 * Event handler map
 */
const handlers: EventHandlerMap = {
  '/api_get_member/require_info': ({ path, body, postBody } = {}, atom) =>
    atom.view('state')
        .modify(
          L.set(L.props('equipment', 'constructionDocks', 'items'), {
            equipment: L.collect(equipmentListIn('api_slot_item'), body),
            constructionDocks: L.collect(constructionDocksIn('api_kdock'), body),
            items: L.collect(itemsIn('api_useitem'), body)
          })),
  '/api_port/port': ({ path, body, postBody } = {}, atom) =>
    atom.view('state')
        .modify(
          L.set(L.props('player', 'resources', 'fleets', 'ships'), {
            player: L.get(basicProfileIn('api_basic'), body),
            resources: L.collect(materialsIn('api_material'), body),
            fleets: L.collect(fleetsIn('api_deck_port'), body),
            ships: L.collect(shipsIn('api_ship'), body)
          }))
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
