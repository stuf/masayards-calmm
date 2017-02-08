import K, * as U from 'karet.util';
import * as L from 'partial.lenses';
import * as R from 'ramda';
import Kefir from 'kefir';

export const interval = t => Kefir.interval(t).toProperty(() => {});

export const Mission = {
  mapState: U.cond([
    [U.equals(0), U.always('idle')],
    [U.equals(1), U.always('on expedition')],
    [U.equals(2), U.always('returned')]
  ])
};

export const Fleet = {
  Mission: {
    stateIn: fleet =>
      Mission.mapState(U.view(['mission', L.define({}), 'state', L.define(0)], fleet)),
    timeLeftIn: fleet =>
      K(interval(500), U.view(['mission', 'completionTime'], fleet),
        (i, t) => U.clamp(0, Infinity, t - +(new Date())))
  },
  findShipBy: id => L.find(R.whereEq({ id })),
  shipIdsIn: U.view(['shipIds', L.define([])])
};

export const Ship = {
  idIn: U.view('id'),
  hpIn: U.view(['hp', L.define([0, 0])])
};
