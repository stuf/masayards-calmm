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

import * as M from './meta';

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
  /**
   * Gets the initial game data on start
   */
  '/api_start2': ({ path, body }: EventArgs = {}, atom: Atom) =>
    atom.view(['state', 'baseData'])
        .modify(
          L.set(
            L.props('ships', 'equipment'), {
              ships: L.collect(M.shipsIn('api_mst_ship'), body),
              equipment: L.collect(M.equipmentIn('api_mst_slotitem'), body)
            })),

  /**
   * Gets the new state of the player fleets
   */
  '/api_get_member/deck': ({ path, body }: EventArgs = {}, atom: Atom) =>
    atom.view('state').modify(L.set('fleets', L.collect(M.fleetsIn(L.identity), body))),

  '/api_get_member/material': ({ path, body } = {}, atom) =>
    atom.view('state')
        .modify(
          L.set('resources', L.collect(M.materialsIn(L.identity), body))),

  /**
   * Gets the basic state of the player's "consumables"; construction docks,
   * usable items and equipment list.
   */
  '/api_get_member/require_info': ({ path, body }: EventArgs = {}, atom: Atom) =>
    atom.view('state')
        .modify(
          L.set(
            L.props('equipment', 'constructionDocks', 'items'), {
              equipment: L.collect(M.equipmentIn('api_slot_item'), body),
              constructionDocks: L.collect(M.constructionDocksIn('api_kdock'), body),
              items: L.collect(M.itemsIn('api_useitem'), body)
            })),

  /**
   * Gets the individual quest items, as well as the quest list view.
   */
  '/api_get_member/questlist': ({ path, body }: EventArgs = {}, atom: Atom) =>
    atom.view('state')
        .modify(
          L.set(
            L.props('quests', 'questList'), {
              quests: L.collect(M.questsIn('api_list'), body),
              questList: L.get(M.questListIn(L.identity), body)
            })),

  // '/api_req_quest/start': ({ path, postBody }: EventArgs = {}, atom: Atom) =>
  //   atom.view('state')
  //       .modify(L.set(['quests', M.basic.asNumber()])),

  // '/api_req_mission/start': ({ path, body, postBody }, atom) =>
  //  atom.view('state')
  //      .modify(
  //        L.set([
  //          'fleets',
  //          M.findIn(postBody, 'id', 'api_deck_id')
  //        ])),
  /**
   * Gets the basic state of the player's profile and relevant data,
   * including fleets, resources and fleets.
   */
  '/api_port/port': ({ path, body }: EventArgs = {}, atom: Atom) =>
    atom.view('state')
        .modify(
          L.set(
            L.props('player', 'resources', 'fleets', 'ships'), {
              player: L.get(M.basicProfileIn('api_basic'), body),
              resources: L.collect(M.materialsIn('api_material'), body),
              fleets: L.collect(M.fleetsIn('api_deck_port'), body),
              ships: L.collect(M.shipsIn('api_ship'), body)
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
    // console.groupCollapsed('Calling function with xs = ', xs);
    // console.log('Should call: f(...xs) where f =', f, ', xs =', xs);
    // console.groupEnd();
    f(...xs);
  }
};

export const initializeObserver = (atom: *) =>
  view.latestIn(atom)
      .observe(handleEvent(atom));
