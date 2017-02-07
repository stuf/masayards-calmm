// @flow
import * as L from 'partial.lenses';
import * as R from 'ramda';

import * as T from './_templates';

const pickIn = R.curryN(2, (template: *, root: *) => [root, L.elems, L.pick(template)]);

export const Master = {
  Ships: { in: pickIn(T.baseShip) },
  Equipment: { in: pickIn(T.equipment) }
};

export const Player = {
  Profile: { in: (root: *) => [root, L.pick(T.basicProfile)] },
  Materials: { in: (root: *) => [root, T.materials] },
  Items: { in: pickIn(T.item) },
  ConstructionDocks: { in: pickIn(T.constructionDock) },
  RepairDocks: { in: pickIn(T.repairDock) }
};

export const Quests = {
  in: (root: *) => [root, L.pick(T.questList)],
  listIn: (root: *) => [root, L.pick(T.quest)]
};

export const Ships = { in: pickIn(T.ship) };

export const Equipment = { in: pickIn(T.equipment) };

export const Fleets = { in: pickIn(T.fleet) };
