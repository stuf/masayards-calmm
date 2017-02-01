/* eslint no-undef: 0 */
/**
  * @flow
 */
type Tuple<A, B> = [A, B];
type Tuple3<A, B, C> = [A, B, C];
type Tuple4<A, B, C, D> = [A, B, C, D];

type GetMemberEvent = '/api_get_member/deck'
                    | '/api_get_member/ship_deck';

// @todo Check if needed: Implement polymorphic type declarations to the incoming API data
// @todo Check if needed: Covariant parameter types for event data handlers
// declare type ApiEvent = GetMemberEvent;

// Declare common types used in the API data

// Player data
declare type kcsapi$Deck = {
  api_flagship: string,
  api_id: number,
  api_member_id: number,
  api_mission: Tuple4<number, number, number, number>,
  api_name: string,
  api_name_id: string,
  api_ship: Array<number>
};

declare type kcsapi$Ship = {
  api_backs: number,
  api_bull: number,
  api_cond: number,
  api_exp: Tuple3<number, number, number>,
  api_fuel: number,
  api_id: number,
  api_kaihi: Tuple<number, number>,
  api_karyoku: Tuple<number, number>,
  api_kyouka: Array<number>,
  api_leng: number,
  api_locked: number,
  api_locked_equip: number,
  api_lucky: Tuple<number, number>,
  api_lv: number,
  api_maxhp: number,
  api_ndock_item: Array<number>,
  api_ndock_time: number,
  api_nowhp: number,
  api_onslot: Array<number>,
  api_raisou: Tuple<number, number>,
  api_sakuteki: Tuple<number, number>,
  api_ship_id: number,
  api_slot: Array<number>,
  api_slot_ex: number,
  api_slotnum: number,
  api_soku: number,
  api_sortno: number,
  api_soukou: Tuple<number, number>,
  api_srate: number,
  api_taiku: Tuple<number, number>,
  api_taisen: Tuple<number, number>
};

// GetMemberEvents

// /api_get_member/ship_deck
declare type kcsapi$GetMember$ShipDeck = {
  api_deck_data: Array<kcsapi$Deck>,
  api_ship_data: Array<kcsapi$Ship>
};
