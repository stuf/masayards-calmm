/**
 * @fileoverview
 *  This is effectively a reducer for keeping the game's state up to date
 *
 * @flow
 */
import * as H from './handlers';

type EventArgs = { path: string, body: *, postBody: *, ts: number };
type EventFn = (args: EventArgs, state: *, status: *) => void;
type EventHandlers = { [path: string]: EventFn };

/**
 * Object containing all the event handlers that will transform incoming API data
 * The API call's path is used as key
 */
const handlers: EventHandlers = {
  /**
   * Receive initial data from the KCS API
   */
  '/api_start2': H.apiStart2,

  /**
   * Receive information about player's fleets
   */
  '/api_get_member/deck': H.apiGetMemberDeck,

  /**
   * Receive state of player's resources
   */
  '/api_get_member/material': H.apiGetMemberMaterial,

  /**
   * Receive information about player's equipment and furniture
   */
  '/api_get_member/require_info': H.apiGetMemberRequireInfo,

  /**
   * Receive information on quests and the current browsing state in the Quest Menu
   */
  '/api_get_member/questlist': H.apiGetMemberQuestList,

  /**
   * Load a fleet preset
   */
  '/api_req_hensei/preset_select': H.apiReqHenseiPresetSelect,

  /**
   * Resupply ship
   */
  '/api_req_hokyu/charge': H.apiReqHokyuCharge,

  /**
   * Receive base player data, including ship roster and profile
   */
  '/api_port/port': H.apiPortPort,

  /**
   * Receive state information about current map and fleet in sortie
   */
  '/api_get_member/ship_deck': H.apiGetMemberShipDeck,
};

export default handlers;
