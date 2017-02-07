// @flow
import * as L from 'partial.lenses';

import * as M from './meta';

type EventArgs = { path: string, body: *, postBody: * };
type EventHandler = (args: EventArgs, atom: *) => void;

/**
 * Event handler map
 */
export default {
  /**
   * Gets the initial game data on start
   */
  '/api_start2': ({ path, body }: EventArgs = {}, state: *) =>
    state.modify(
      L.set(['baseData', L.props('ships', 'equipment')], {
        ships: L.collect(M.Master.Ships.in('api_mst_ship'), body),
        equipment: L.collect(M.Master.Equipment.in('api_mst_slotitem'), body),
      })),

  /**
   * Gets the new state of the player fleets
   */
  '/api_get_member/deck': ({ path, body }: EventArgs = {}, state: *) =>
    state.modify(L.set('fleets', L.collect(M.Fleets.in(L.identity), body))),

  /**
   * Gets the ship decks' statuses that are participating in the sortie
   */
  '/api_get_member/ship_deck': ({ path, body }: EventArgs = {}, state: *) => state,

  '/api_get_member/material': ({ path, body }: EventArgs = {}, state: *) =>
    state.modify(
      L.set('resources', L.collect(M.Player.Materials.in(L.identity), body))),

  /**
   * Gets the basic state of the player's "consumables"; construction docks,
   * usable items and equipment list.
   */
  '/api_get_member/require_info': ({ path, body }: EventArgs = {}, state: *) =>
    state.modify(
      L.set(
        L.props('equipment', 'constructionDocks', 'items'), {
          equipment: L.collect(M.Equipment.in('api_slot_item'), body),
          constructionDocks: L.collect(M.Player.ConstructionDocks.in('api_kdock'), body),
          items: L.collect(M.Player.Items.in('api_useitem'), body)
        })),

  /**
   * Gets the individual quest items, as well as the quest list view.
   */
  '/api_get_member/questlist': ({ path, body }: EventArgs = {}, state: *) =>
    state.modify(
      L.set(
        L.props('quests', 'questList'), {
          questList: L.collect(M.Quests.listIn('api_list'), body),
          questState: L.get(M.Quests.in(L.identity), body)
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
  '/api_port/port': ({ path, body }: EventArgs = {}, state: *) =>
    state.modify(
      L.set(
        L.props('player', 'resources', 'fleets', 'ships'), {
          player: L.get(M.Player.Profile.in('api_basic'), body),
          resources: L.collect(M.Player.Materials.in('api_material'), body),
          fleets: L.collect(M.Fleets.in('api_deck_port'), body),
          ships: L.collect(M.Ships.in('api_ship'), body)
        }))
};
