/* eslint-disable no-confusing-arrow */
import * as L from 'partial.lenses';
import * as R from 'ramda';
import * as U from 'karet.util';

import * as T from './_templates';

export const collectWithIndex = (o, d, idProp = 'id') => R.indexBy(R.prop(idProp), L.collect(o, d));

export const keysToString = R.compose(R.map(R.toString), R.keys);

const pickIn = R.curryN(2, (template, root) => [root, L.elems, L.pick(template)]);

const lookupKindIn = U.curry((t, p) => [p, L.define({}), t]);

/**
 * Create a lookup table/map where the key in `a` will have a value given in `b`.
 * @todo Rewrite me into meta
 */
export const getLUT = (xs, k, tk) =>
  U.seq(xs,
    R.map(R.props([k, tk])),
    R.fromPairs);

export const Lookups = {
  BaseData: {
    ships: lookupKindIn('base', 'ships'),
    equipment: lookupKindIn('base', 'equipment')
  },
  PlayerData: {
    ships: lookupKindIn('player', 'ships'),
    equipment: lookupKindIn('player', 'equipment')
  }
};

export const Master = {
  Ships: {
    in: pickIn(T.baseShip)
  },
  Equipment: {
    in: pickIn(T.equipment)
  }
};

export const Player = {
  Profile: { in: root => [root, L.pick(T.basicProfile)] },
  Materials: { in: root => [root, T.materials] },
  Items: { in: pickIn(T.item) },
  ConstructionDocks: { in: pickIn(T.constructionDock) },
  RepairDocks: { in: pickIn(T.repairDock) }
};

export const Quests = {
  in: L.pick(T.questList),
  listIn: ['api_list', L.pick(T.quest)]
};

export const Ships = {
  in: pickIn(T.ship)
};

export const Equipment = { in: pickIn(T.equipment) };

export const Fleets = { in: pickIn(T.fleet) };

// @todo Redundant?
export const StateData = {
  '/api_port/port': L.pick({
    player: 'player',
    resources: 'resources',
    fleets: 'fleets',
    ships: ['ships', 'player']
  })
};
