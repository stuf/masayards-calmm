/**
 * @overview
 */
import Kefir from 'kefir';
import K, * as U from 'karet.util';
import * as L from 'partial.lenses';
import * as R from 'ramda';

export const Basic = {
  percentage: U.compose(U.multiply(100), U.apply(U.divide)),
  percentageIn: x => U.lift(Basic.percentage, x),
  interval: t => Kefir.interval(t).toProperty(() => {})
};

export const Views = {
  gameIn: U.view('game'),
  gameStateIn: U.view(['game', 'state'])
};

// @todo Rewrite this monster
export const Fleet = {
  fleetInRange: (start, end) => U.view(['fleets', L.slice(start, end)]),
  nameIn: U.view('name'),
  shipIdsIn: U.view(['shipIds', L.define([])]),
  stateIn: U.view(['mission', L.define({}), 'state', L.valueOr(0)]),
  missionIdIn: U.view(['mission', 'missionId', L.valueOr(0)]),
  mapState: U.cond([
    [U.equals(0), U.always('idle')],
    [U.equals(1), U.always('on expedition')],
    [U.equals(2), U.always('returned')]
  ]),
  findShipBy: id => L.find(R.whereEq({ id })),
  missionTimeLeftIn: fleet =>
    K(Basic.interval(500), U.view(['mission', 'completionTime'], fleet),
      (i, t) => U.clamp(0, Infinity, t - +(new Date()))),
  Mission: {
    timeLeft: fleet =>
      K(Basic.interval(500), U.view(['mission', 'completionTime'], fleet),
        (i, t) => U.clamp(0, Infinity, t - +(new Date())))
  },
  shipsFrom: R.curry((ids, ships) =>
    U.view([L.define([]), L.filter(ship => ids.includes(ship.id))], ships))
};

export const Ship = {
  hpIn: U.view(['hp', L.define([])]),
  idIn: U.view('id')
};

export const Player = {
  profileIn: U.view(['game', 'state', 'player'])
};

export const Quests = {
  activeQuestsIn: U.view(['quests'])
};
