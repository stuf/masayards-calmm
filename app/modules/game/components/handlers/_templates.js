/**
 * @fileoverview
 *  Partial lens templates and branching objects.
 *  Also includes some other template stuff.
 *
 * @flow
 */
import * as L from 'partial.lenses';
import * as R from 'ramda';
import { chooseNormalizer } from './_normalizers';

// Objects

export const recipe = L.pick({
  fuel: 'api_item1',
  ammo: 'api_item2',
  steel: 'api_item3',
  bauxite: 'api_item4',
  constructionMaterials: 'api_item5'
});

/**
 * Describe a dictionary of the different material/resource types that exist.
 */
export const materialTypes = R.fromPairs([
  R.pair(0, '__zero'),  // @todo Redundant, use nothing instead
  R.pair(1, 'fuel'),
  R.pair(2, 'ammo'),
  R.pair(3, 'steel'),
  R.pair(4, 'bauxite'),
  R.pair(5, 'buckets'),
  R.pair(6, 'constructionMaterials'),
  R.pair(7, 'flamethrowers'),
  R.pair(8, 'modernization')
]);

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
export const materials = L.choose(chooseNormalizer);

/**
 * Composed parametric lens for getting the material status.
 */
export const materialsIn = (root: *) => [root, materials];

/**
 * Basic player profile lens template
 */
export const basicProfileTemplate = {
  id: 'api_member_id',
  name: 'api_nickname',
  level: 'api_level',
  experience: 'api_experience',
  rank: 'api_rank',
  coins: 'api_fcoin',
  medals: 'api_medal',
  flags: L.pick({
    lscIsUnlocked: ['api_large_dock', L.normalize(R.equals(1))]
  }),
  tutorial: L.pick({
    isCompleted: ['api_tutorial', L.normalize(R.equals(0))],
    completion: 'api_tutorial_progress'
  }),
  maxShips: 'api_max_chara',
  maxEquiment: 'api_max_slotitem',
  maxFurniture: 'api_max_kagu',
  furniture: 'api_furniture',
  fleets: 'api_count_deck',
  constructionDocks: 'api_count_kdock',
  reparationDocks: 'api_count_ndock',
  sortiesWon: 'api_st_win',
  sortiesLost: 'api_st_lost',
  missionsDone: 'api_ms_count',
  missionsSuccess: 'api_ms_success',
  pvpsWon: 'api_pt_win',
  pvpsLost: 'api_pt_lose',
};

export const basicProfile = L.pick(basicProfileTemplate);

export const basicProfileIn = (root: *) => [root, basicProfile];

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

export const equipmentIn = (root: *) => [root, equipment];

// Ships

export const ship = {
  id: 'api_id'
};

export const shipIn = (root: *) => [root, ship];

export const ships = [L.elems, L.pick(ship)];

export const shipsIn = (root: *) => [root, ships];

// Fleets

export const fleet = {
  id: 'api_id',
  name: 'api_name',
  nameId: 'api_name_id',
  mission: 'api_mission',
  flagship: 'api_flagship',
  ships: 'api_ship'
};

export const pickFleet = L.pick(fleet);

export const fleets = [L.elems, L.pick(fleet)];

export const fleetsIn = (root: *) => [root, fleets];


// Docks

export const constructionDock = {
  id: 'api_id',
  state: 'api_state',
  createdShipId: 'api_created_ship_id',
  completionTime: 'api_complete_time',
  completionTimeString: 'api_complete_time_str',
  recipe
};

export const constructionDocks = [L.elems, L.pick(constructionDock)];

export const constructionDocksIn = (root: *) => [root, constructionDocks];

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
  recipe
};

/**
 * Repair dock list lens template
 */
export const repairDocks = [L.elems, L.pick(repairDock)];

// Items

export const item = {
  id: 'api_id',
  type: L.normalize(n => n),
  value: 'api_value'
};

export const items = [L.elems, L.pick(item)];

export const itemsIn = (root: *) => [root, items];

// Furniture

export const furniture = {
  id: 'api_id',
  type: 'api_furniture_type',
  furnitureNumber: 'api_furniture_no',
  furnitureId: 'api_furniture_id'
};

export const furnitureList = [L.elems, L.pick(furniture)];

export const furnitureListIn = (root: *) => [root, furnitureList];

export default {
  materialTypes,
  materials,
  materialsIn,
  equipment,
  equipmentIn,
  fleet,
  fleets,
  fleetsIn,
  constructionDock,
  constructionDocks,
  constructionDocksIn,
  repairDock,
  repairDocks,
  furniture,
  furnitureList,
  furnitureListIn,
  basicProfile,
  messageLog
};
