/**
 * @fileoverview
 *  This is effectively a reducer for keeping the game's state up to date
 *
 * @flow
 */
import * as U from 'karet.util';
import * as L from 'partial.lenses';
import * as R from 'ramda';

import * as M from './meta';

const idProp = R.prop('id');

// @todo Rewrite me into meta
const getLUT = (xs, a, b) =>
  U.seq(xs,
    R.map(R.props([a, b])),
    R.fromPairs);

type EventArgs = { path: string, body: *, postBody: * };

/**
 * Event handler map
 */
export default {
  /**
   * Gets the initial game data on start
   */
  '/api_start2': ({ path, body }: EventArgs = {}, state: *) =>
    state.modify(
      L.set(L.pick({
        ships: ['ships', 'base'],
        equipment: ['equipment', 'base']
      }), {
        ships: R.indexBy(idProp, L.collect(M.Master.Ships.in('api_mst_ship'), body)),
        equipment: R.indexBy(idProp, L.collect(M.Master.Equipment.in('api_mst_slotitem'), body)),
      })),

  /**
   * Gets the new state of the player fleets
   */
  '/api_get_member/deck': ({ path, body }: EventArgs = {}, state: *) =>
    state.modify(
      L.set('fleets',
        R.indexBy(idProp, L.collect(M.Fleets.in(L.identity), body)))),

  /**
   * Gets the ship decks' statuses that are participating in the sortie
   */
  '/api_get_member/ship_deck': ({ path, body }: EventArgs = {}, state: *) => state,

  '/api_get_member/material': ({ path, body }: EventArgs = {}, state: *) =>
    state.modify(
      L.set('resources',
        L.collect(M.Player.Materials.in(L.identity), body))),

  /**
   * Gets the basic state of the player's "consumables"; construction docks,
   * usable items and equipment list.
   */
  '/api_get_member/require_info': ({ path, body }: EventArgs = {}, state: *) => {
    const equipment = L.collect(M.Equipment.in('api_slot_item'), body);

    state.modify(
      L.set(L.pick({
        equipment: ['equipment', 'player'],
        equipmentLUT: ['lookup', 'equipment', 'player'],
        constructionDocks: 'constructionDocks',
        items: 'items',
      }), {
        equipment: R.indexBy(idProp, equipment),
        equipmentLUT: getLUT(equipment, 'id', 'equipmentId'),
        constructionDocks: R.indexBy(idProp,
          L.collect(M.Player.ConstructionDocks.in('api_kdock'), body)),
        items: R.indexBy(idProp, L.collect(M.Player.Items.in('api_useitem'), body)),
      }));
  },

  /**
   * Gets the individual quest items, as well as the quest list view.
   */
  '/api_get_member/questlist': ({ path, body }: EventArgs = {}, state: *) =>
    state.modify(
      L.set(
        L.props('quests', 'questList'), {
          questList: R.indexBy(idProp, L.collect(M.Quests.listIn('api_list'), body)),
          questState: L.get(M.Quests.in(L.identity), body)
        })),

  /**
   * Gets the basic state of the player's profile and relevant data,
   * including fleets, resources and fleets.
   */
  '/api_port/port': ({ path, body }: EventArgs = {}, state: *) => {
    const ships = L.collect(M.Ships.in('api_ship'), body);

    state.modify(
      L.set(L.pick({
        player: 'player',
        resources: 'resources',
        fleets: 'fleets',
        ships: ['ships', 'player'],
        shipLUT: ['lookup', 'ships', 'player']
      }), {
        player: L.get(M.Player.Profile.in('api_basic'), body),
        resources: R.indexBy(idProp, L.collect(M.Player.Materials.in('api_material'), body)),
        fleets: R.indexBy(idProp, L.collect(M.Fleets.in('api_deck_port'), body)),
        ships: R.indexBy(idProp, ships),
        shipLUT: getLUT(ships, 'id', 'shipId')
      }));
  }
};
