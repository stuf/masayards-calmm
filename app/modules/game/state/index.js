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
        ships: M.collectWithIndex(M.Master.Ships.in('api_mst_ship'), body),
        equipment: M.collectWithIndex(M.Master.Equipment.in('api_mst_slotitem'), body)
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
    const constructionDocks = L.collect(M.Player.ConstructionDocks.in('api_kdock'), body);

    state.modify(
      L.set(L.pick({
        equipment: L.pick({
          entities: ['equipment', 'player'],
          lookup: ['lookup', 'equipment', 'player'],
          count: ['count', 'equipment', L.index(0)]
        }),
        constructionDocks: L.pick({
          entities: 'constructionDocks',
          count: ['count', 'constructionDocks']
        }),
        items: 'items',
      }), {
        equipment: {
          entities: R.indexBy(idProp, equipment),
          lookup: M.getLUT(equipment, 'id', 'equipmentId'),
          count: R.length(equipment)
        },
        constructionDocks: {
          entities: R.indexBy(idProp, constructionDocks),
          count: R.length(constructionDocks)
        },
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
    const player = L.get(M.Player.Profile.in('api_basic'), body);
    const shipCount = R.pair(R.length(ships), R.prop('maxShips', player));

    // @todo See if this could be rearranged a little bit
    // Maybe a `.seq` that sets a simpler part of the structure on each step?
    state.modify(
      L.set(L.pick({
        player: 'player',
        resources: 'resources',
        fleets: 'fleets',
        ships: L.pick({
          entities: ['ships', 'player'],
          lookup: ['lookup', 'ships'],
          count: ['count', 'ships']
        }),
        equipment: L.pick({
          max: ['count', 'equipment', L.index(1)]
        }),
        furniture: L.pick({
          max: ['count', 'furniture', L.index(1)]
        })
      }), {
        player: R.omit(['maxShips', 'maxEquipment', 'maxFurniture'], player),
        resources: R.indexBy(idProp, L.collect(M.Player.Materials.in('api_material'), body)),
        fleets: R.indexBy(idProp, L.collect(M.Fleets.in('api_deck_port'), body)),
        ships: {
          entities: R.indexBy(idProp, ships),
          lookup: M.getLUT(ships, 'id', 'shipId'),
          count: shipCount
        },
        equipment: {
          max: R.prop('maxEquipment', player)
        },
        furniture: {
          max: R.prop('maxFurniture', player)
        }
      }));
  }
};
