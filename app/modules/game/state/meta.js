// @flow
import * as L from 'partial.lenses';

import * as M from './meta';
import * as T from './_templates';

export const Master = {
  Ships: { in: (root: *) => [root, L.elems, L.pick(T.baseShip)] },
  Equipment: { in: (root: *) => [root, L.elems, L.pick(T.equipment)] }
};

export const Player = {
  Profile: { in: (root: *) => [root, L.pick(T.basicProfile)] },
  Materials: { in: (root: *) => [root, L.elems, T.materials] },
  Items: { in: (root: *) => [root, L.elems, T.item] },
  ConstructionDocks: { in: (root: *) => [root, L.elems, T.constructionDock] },
  RepairDocks: { in: (root: *) => [root, L.elems, T.repairDock] }
};

export const Quests = {
  in: (root: *) => [root, T.questList],
  listIn: (root: *) => [root, L.elems, L.pick(T.quest)]
};

export const Ships = { in: (root: *) => [root, L.elems, L.pick(T.ship)] };

export const Equipment = { in: (root: *) => [root, L.elems, L.pick(T.equipment)] };

export const Fleets = { in: (root: *) => [root, L.elems, L.pick(T.fleet)] };
