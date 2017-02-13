/* eslint-disable no-underscore-dangle */
import K, * as U from 'karet.util';
import * as L from 'partial.lenses';
import * as R from 'ramda';

export const Mission = {
  mapState: U.cond([
    [U.equals(0), U.always('idle')],
    [U.equals(1), U.always('on expedition')],
    [U.equals(2), U.always('returned')]
  ])
};

export const Fleet = {
  Mission: {
    timeLeftIn: U.view(['mission', 'completionTime', L.define(0)]),
    stateIn: fleet =>
      Mission.mapState(U.view(['mission', L.define({}), 'state', L.define(0)], fleet))
  },
  findShipBy: id => L.find(R.whereEq({ id })),
  shipIdsIn: U.view(['shipIds', L.define([])])
};

export const Ship = {
  concat: {
    empty: s => s,
    concat: (s1, s2) => ({ ...s1, ...s2 })
  },
  idIn: U.view('id'),
  hpIn: U.view(['hp', L.define([0, 0])]),
  in: id => U.view(['ships', `${id}`]) // @todo Isos ftw?
};

export const BaseShip = {
  in: id => U.view(['baseData', 'ships', `${id}`])
};
