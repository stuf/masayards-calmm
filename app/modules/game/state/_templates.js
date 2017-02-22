/**
 * @fileoverview
 *  Partial lens templates and branching objects.
 *  Also includes some other template stuff.
 * @todo Extract field names somewhere, since a lot of them are abbreviated transliterations
 *
 * @flow
 */
import { Map } from 'immutable';
import * as L from 'partial.lenses';
import * as R from 'ramda';
import * as N from './_normalizers';

// Objects

export const recipe = {
  fuel: 'api_item1',
  ammo: 'api_item2',
  steel: 'api_item3',
  bauxite: 'api_item4',
  constructionMaterials: 'api_item5'
};

/**
 * List of resources available in the game.
 * The correct material can be retrieved by `material.id - 1`.
 */
export const materialTypeList: Array<string> = [
  'fuel',
  'ammo',
  'steel',
  'bauxite',
  'instantRepair',
  'constructionMaterials',
  'instantConstruction',
  'modernizationMaterials'
];

// Templates

/**
 * Conditional material lens template. "Conditional" meaning that when focused on an element
 * that is a list of values that describe some state of player resources or resources used.
 *
 * Because the API is such a wonderful tangle of horrors, the resource state can either be:
 *  - a flat list of numbers, with every resource value at index `n` meaning a resource of ID `n + 1`
 *  - a list of objects representing the resource type and value
 *
 * `chooseNormalizer` will take the head of this list and depending on the type of value `head` is,
 * will return a lens of `L.normalize` with the appropriate transformation function for the elements
 * for the list.
 */
export const materials = L.choose(N.chooseNormalizer);

/**
 * Optic template for handling a basic player profile
 */
export const basicProfile = {
  id: 'api_member_id',
  name: 'api_nickname',
  level: 'api_level',
  experience: 'api_experience',
  rank: 'api_rank',
  coins: 'api_fcoin',
  medals: 'api_medal',
  flags: [L.required({}), L.pick({
    lscIsUnlocked: ['api_large_dock', L.define(0), N.asBool]
  })],
  tutorial: [L.required({}), L.pick({
    isCompleted: ['api_tutorial', L.define(0), N.asBool],
    completion: 'api_tutorial_progress'
  })],
  maxShips: ['api_max_chara', L.define(-1)],
  maxEquipment: ['api_max_slotitem', L.define(-1)],
  maxFurniture: ['api_max_kagu', L.define(-1)],
  furniture: ['api_furniture', L.required([])],
  fleets: ['api_count_deck', L.required([])],
  constructionDocks: ['api_count_kdock', L.required([])],
  reparationDocks: ['api_count_ndock', L.required([])],
  sortiesWon: 'api_st_win',
  sortiesLost: 'api_st_lost',
  missionsDone: 'api_ms_count',
  missionsSuccess: 'api_ms_success',
  pvpsWon: 'api_pt_win',
  pvpsLost: 'api_pt_lose',
};

/**
 * Message log lens template
 */
export const messageLog = L.pick({
  number: 'api_no',
  type: 'api_type',
  state: 'api_state',
  message: 'api_message'
});

// Equipment

export const equipment = {
  id: 'api_id',
  equipmentId: 'api_slotitem_id',
  locked: ['api_locked', L.normalize(R.equals(1))],
  level: 'api_level',
  alv: 'api_alv'
};

// Equipment types

export const equipmentType = {
  id: 'api_id',
  name: 'api_name',
  show: ['api_show_flg', L.valueOr(0), N.asBool]
};

// Ships

export const ship = {
  id: 'api_id',
  sortId: 'api_sortno',
  shipId: 'api_ship_id',
  experience: 'api_exp',
  level: 'api_lv',
  stars: 'api_stars',
  morale: 'api_cond',
  fuel: 'api_fuel',
  ammo: 'api_bull',
  // @todo
  hp: [L.props('api_nowhp', 'api_maxhp'), L.normalize(R.values)],
  slots: L.pick({
    count: 'api_slotnum',
    equipment: 'api_slot'
  }),
  repair: L.pick({
    cost: 'api_ndock_item',
    time: 'api_ndock_time'
  }),
  stats: [L.required({}), L.pick({
    evasion: 'api_kaihi',
    torpedo: 'api_raisou',
    endurance: 'api_taik',
    antiAir: 'api_taiku',
    antiSub: 'api_taisen',
    armorBase: 'api_souk',
    armor: 'api_soukou',
    losBase: 'api_saku',
    los: 'api_sakuteki',
    luck: 'api_lucky'
  })],
  flags: [L.required({}), L.pick({
    locked: ['api_locked', L.valueOr(0), N.asBool],
    slotItemLocked: ['api_locked_equip', L.valueOr(0), N.asBool]
  })]
};

export const ships = [L.elems, L.pick(ship)];

// Ship types

export const shipType = {
  id: 'api_id',
  sortId: 'api_sortno',
  kcnt: 'api_kcnt',
  scnt: 'api_scnt',
  name: 'api_name',
  equippableTypes: 'api_equip_type'
};

// Fleets

export const fleet = {
  id: 'api_id',
  name: 'api_name',
  nameId: 'api_name_id',
  mission: ['api_mission', L.normalize(N.Expeditions.normalizer)],
  flagship: 'api_flagship',
  shipIds: ['api_ship', L.filter(id => id !== -1)]
};

export const fleets = [L.elems, L.pick(fleet)];


// Docks

export const constructionDock = {
  id: 'api_id',
  state: 'api_state',
  createdShipId: 'api_created_ship_id',
  completionTime: 'api_complete_time',
  completionTimeString: 'api_complete_time_str',
  recipe: L.pick(recipe)
};

export const constructionDocks = [L.elems, L.pick(constructionDock)];

/**
 * Single repair dock lens template
 * @todo Normalize repair dock states (maybe Symbols?)
 */
export const repairDock = {
  id: 'api_id',
  state: 'api_state',
  shipId: 'api_ship_id',
  completionTime: 'api_complete_time',
  completionTimeString: 'api_complete_time_str',
  recipe: L.pick(recipe)
};

/**
 * Repair dock list lens template
 */
export const repairDocks = [L.elems, L.pick(repairDock)];

// Items

export const item = {
  id: 'api_id',
  type: L.normalize(R.identity),
  value: 'api_value'
};

export const itemEntity = {
  id: 'api_id',
  useType: 'api_usetype',
  category: 'api_category',
  name: 'api_name',
  description: ['api_description', L.normalize(N.Simple.rejectEmpty)],
  price: 'api_price'
};

export const payItemEntity = {
  id: 'api_id',
  type: 'api_type',
  name: 'api_name',
  description: ['api_description', L.normalize(N.Simple.normalizeLinebreaks)],
  item: 'api_item',
  price: 'api_price'
};

export const items = [L.elems, L.pick(item)];

// Furniture

export const furniture = {
  id: 'api_id',
  type: 'api_furniture_type',
  furnitureNumber: 'api_furniture_no',
  furnitureId: 'api_furniture_id'
};

export const furnitureEntity = {
  id: 'api_id',
  type: 'api_type',
  number: 'api_no',
  title: 'api_title',
  description: 'api_description',
  rarity: 'api_rarity',
  price: 'api_price',
  onSale: 'api_saleflg',
  seasonal: 'api_season'
};

export const furnitureGraphic = {
  id: 'api_id',
  type: 'api_type',
  number: 'api_no',
  filename: 'api_filename',
  version: 'api_version'
};

export const furnitureList = [L.elems, L.pick(furniture)];

// Quests
export const QuestState = Map([
  [0, null],
  [1, 'INCOMPLETE'],
  [2, 'IN_PROGRESS'],
  [3, 'COMPLETE']
]);

export const QuestProgress = Map([
  [0, 0],
  [1, 0.5],
  [2, 0.8],
  [3, 1]
]);

export const QuestCategory = Map([
  [0, null],
  [1, 'first'],
  [2, 'second'],
  [3, 'third'],
  [4, 'fourth'],
  [5, 'fifth'],
  [6, 'sixth'],
  [7, 'seventh']
]);

export const quest = {
  id: 'api_no',
  type: 'api_type',
  category: 'api_category',
  state: ['api_state', L.normalize(N.Quests.questStateNormalizer)],
  title: 'api_title',
  detail: 'api_detail',
  reward: 'api_reward',
  progress: ['api_progress_flag', L.normalize(N.Quests.questProgressNormalizer)]
};

export const quests = [L.elems, L.pick(quest)];

// Quest list (the view, not a list of quests)
export const questList = {
  count: 'api_count',
  currentPage: 'api_disp_page',
  execCount: 'api_exec_count',
  execType: 'api_exec_type',
  pageCount: 'api_page_count'
};

export const baseShip = {
  id: 'api_id',
  sortId: 'api_sortno',
  remodelLevel: 'api_afterlv',
  remodelResultId: 'api_aftershipid',
  remodelCost: L.pick({
    ammo: 'api_afterbull',
    fuel: 'api_afterfuel'
  }),
  rarity: 'api_backs',
  name: 'api_name',
  message: ['api_getmes', N.normLinebreaks],
  stats: L.pick({
    antiAir: 'api_tyku',
    torpedo: 'api_raig',
    range: 'api_leng',
    speed: 'api_soku',
    luck: 'api_luck'
  })
};

// Maps

export const mapArea = {
  id: 'api_id',
  name: 'api_name',
  type: 'api_type'
};

export const mapInfo = {
  id: 'api_id',
  mapAreaId: 'api_maparea_id',
  number: 'api_no',
  name: 'api_name',
  level: 'api_level',
  operation: L.pick({
    name: 'api_opetext',
    description: ['api_infotext', N.normLinebreaks]
  }),
  item: 'api_item',
  health: L.pick({
    maxHealth: 'api_max_maphp',
    requiredDefeatCount: 'api_required_defeat_count',
    // @todo Normalize this
    sallyFlag: 'api_sally_flag'
  })
};

export const mapMusic = {
  id: 'api_id',
  mapAreaId: 'api_maparea_id',
  number: 'api_no',
  music: L.pick({
    map: 'api_map_bgm',
    boss: 'api_boss_bgm'
  })
};

// @todo Make consistent use of either `mission` or `expedition`
export const mission = {
  id: 'api_id',
  mapAreaId: 'api_maparea_id',
  name: 'api_name',
  details: 'api_details',
  duration: 'api_time',
  difficulty: 'api_difficulty',
  cost: L.pick({
    fuel: 'api_use_fuel',
    ammo: 'api_use_bull'
  }),
  rewards: L.pick({
    item1: 'api_win_item1',
    item2: 'api_win_item2'
  }),
  flags: L.pick({
    isCancelable: 'api_return_flag'
  })
};

// export default {
//   materialTypeList,
//   materials,
//   equipment,
//   equipmentType,
//   ship,
//   shipType,
//   ships,
//   fleet,
//   fleets,
//   constructionDock,
//   constructionDocks,
//   repairDock,
//   repairDocks,
//   furniture,
//   furnitureEntity,
//   furnitureList,
//   item,
//   itemEntity,
//   payItemEntity,
//   basicProfile,
//   messageLog,
//   quest,
//   quests,
//   questList
// };
