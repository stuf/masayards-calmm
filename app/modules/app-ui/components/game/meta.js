/* eslint-disable no-underscore-dangle */
import * as U from 'karet.util';
import * as L from 'partial.lenses';
import * as R from 'ramda';
import Kefir from 'kefir';

export const interval = t => Kefir.interval(t).toProperty(R.identity);

export const timeDelta = t => t - +(new Date());

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
  idIn: U.view('id'),
  hpIn: U.view(['hp', L.define([0, 0])])
};
