/**
 * @fileoverview
 *  This is effectively a reducer for keeping the game's state up to date
 *
 * @flow
 */
import * as H from './handlers';

type EventArgs = { path: string, body: *, postBody: * };

type EventFn = (args: EventArgs, state: *, status: *) => void;

type EventHandlers = { [path: string]: EventFn };

// Event handler map

const handlers: EventHandlers = {
  '/api_start2': H.apiStart2,
  '/api_get_member/deck': H.apiGetMemberDeck,
  '/api_get_member/material': H.apiGetMemberMaterial,
  '/api_get_member/require_info': H.apiGetMemberRequireInfo,
  '/api_get_member/questlist': H.apiGetMemberQuestList,
  '/api_req_hensei/preset_select': H.apiReqHenseiPresetSelect,
  '/api_req_hokyu/charge': H.apiReqHokyuCharge,
  '/api_port/port': H.apiPortPort,
  /**
   * Gets the ship decks' statuses that are participating in the sortie
   */
  '/api_get_member/ship_deck': ({ path, body }: EventArgs = {}, state: *) => state,
};

export default handlers;
