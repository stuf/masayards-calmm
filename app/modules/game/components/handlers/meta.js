/**
 * @fileoverview
 *  Overview comes here some day
 *
 * @flow
 */
import * as L from 'partial.lenses';
import * as R from 'ramda';
import {
  ship,
  item,
  equipment,
  fleet,
  materials,
  constructionDock,
  repairDock,
  basicProfile,
  quests,
  questList
} from './_templates';

export const basic = {
  asNumber: (x: *) => parseInt(x, 10)
};

// Convenience tools
const findInM = (src: *, srcProp: string, prop: string) => R.propEq(prop, basic.asNumber(R.prop(srcProp, src)));

export const findIn = (src: *, srcProp: string, prop: string) => L.find(findInM(src, srcProp, prop));

/**
 * Player basic profile
 * @type {{template, data: {basicProfileIn: ((p1?:*)=>[*])}}}
 */
export const BasicProfile = {
  template: basicProfile,
  data: { basicProfileIn: (root: * = L.identity) => [root, BasicProfile.template] }
};

/**
 * @type {Function}
 */
export const basicProfileIn = BasicProfile.data.basicProfileIn;

/**
 * Player resource state
 * @type {{template, data: {materialsIn: ((p1?:*)=>[*])}}}
 */
export const Materials = {
  template: materials,
  data: { materialsIn: (root: * = L.identity) => [root, Materials.template] }
};

/**
 * @type {Function}
 */
export const materialsIn = Materials.data.materialsIn;

/**
 * Player consumable item
 * @type {{template, data: {itemsIn: ((p1?:*)=>[*])}}}
 */
export const Items = {
  template: item,
  data: { itemsIn: (root: * = L.identity) => [root, L.elems, L.pick(Items.template)] }
};

/**
 * @type {Function}
 */
export const itemsIn = Items.data.itemsIn;

/**
 * Ship equipment item
 * @type {{template, data: {equipmentIn: ((p1?:*)=>[*])}}}
 */
export const Equipment = {
  template: equipment,
  data: { equipmentIn: (root: * = L.identity) => [root, L.elems, L.pick(Equipment.template)] }
};

/**
 * @type {Function}
 */
export const equipmentIn = Equipment.data.equipmentIn;

/**
 * Ship data
 * @type {{template, data: {shipsIn: ((p1?:*)=>[*])}}}
 */
export const Ships = {
  template: ship,
  data: { shipsIn: (root: * = L.identity) => [root, L.elems, L.pick(Ships.template)] }
};

/**
 * @type {Function}
 */
export const shipsIn = Ships.data.shipsIn;

/**
 * Player fleet
 * @type {{template, data: {fleetsIn: ((p1?:*)=>[*])}}}
 */
export const Fleets = {
  template: fleet,
  data: { fleetsIn: (root: * = L.identity) => [root, L.elems, L.pick(Fleets.template)] }
};

/**
 * @type {Function}
 */
export const fleetsIn = Fleets.data.fleetsIn;

/**
 * Player construction docks
 * @type {{template, data: {constructionDocksIn: ((p1?:*)=>[*])}}}
 */
export const ConstructionDocks = {
  template: constructionDock,
  data: { constructionDocksIn: (root: * = L.identity) => [root, L.elems, L.pick(ConstructionDocks.template)] }
};

/**
 * @type {Function}
 */
export const constructionDocksIn = ConstructionDocks.data.constructionDocksIn;

/**
 * Player ship reparation docks
 * @type {{template, data: {repairDocksIn: ((p1?:*)=>[*])}}}
 */
export const RepairDocks = {
  template: repairDock,
  data: { repairDocksIn: (root: * = L.identity) => [root, L.elems, L.pick(RepairDocks.template)] }
};

/**
 * @type {Function}
 */
export const repairDocksIn = RepairDocks.data.repairDocksIn;

// Quests

export const Quests = {
  template: {
    quests,
    questList
  },
  data: {
    quests: (root: * = L.identity) => [root, L.elems, L.pick(Quests.template.quests)],
    questList: (root: * = L.identity) => [root, L.pick(Quests.template.questList)]
  }
};

export const questsIn = Quests.data.quests;
export const questListIn = Quests.data.questList;

export const BaseData = {
  baseDataIn: (root: * = L.identity) => [root, 'baseData']
};
