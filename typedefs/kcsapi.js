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

// Base ship type
declare type kcsapi$BaseShip = {
  api_afterbull: number,
  api_afterfuel: number,
  api_afterlv: number,
  api_aftershipid: string,
  api_backs: number,
  api_broken: Tuple4<number, number, number, number>,
  api_buildtime: number,
  api_bull_max: number,
  api_fuel_max: number,
  api_getmes: string,
  api_houg: Tuple<number, number>,
  api_id: number,
  api_leng: number,
  api_luck: Tuple<number, number>,
  api_maxeq: Array<number>,
  api_name: string,
  api_powup: Tuple4<number, number, number, number>,
  api_raig: Tuple<number, number>,
  api_slot_num: number,
  api_soku: number,
  api_sortno: number,
  api_souk: Tuple<number, number>,
  api_stype: number,
  api_taik: Tuple<number, number>,
  api_tyku: Tuple<number, number>,
  api_voicef: number,
  api_yomi: string
};

// Base equipment
declare type kcsapi$BaseEquipment = {
  api_atap: number,
  api_bakk: number,
  api_baku: number,
  api_broken: Tuple4<number, number, number, number>,
  api_houg: number,
  api_houk: number,
  api_houm: number,
  api_id: number,
  api_info: string,
  api_leng: number,
  api_luck: number,
  api_name: string,
  api_raig: number,
  api_raik: number,
  api_raim: number,
  api_rare: number,
  api_sakb: number,
  api_saku: number,
  api_soku: number,
  api_sortno: number,
  api_souk: number,
  api_taik: number,
  api_tais: number,
  api_tyku: number,
  api_type: Array<number>,
  api_usebull: string
};

// Base ship type
declare type kcsapi$BaseShipType = {
  api_equip_type: { [key: string]: number },
  api_id: number,
  api_kcnt: number,
  api_name: string,
  api_scnt: number,
  api_sortno: number
};

declare type kcsapi$BaseMapArea = {
  api_id: number,
  api_name: string,
  api_type: number
};

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
