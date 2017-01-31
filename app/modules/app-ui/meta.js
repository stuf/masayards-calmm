/**
 * @overview
 */
import K, * as U from 'karet.util';
import * as L from 'partial.lenses';
import * as R from 'ramda';

export const Basic = {
  percentage: U.compose(U.multiply(100), U.apply(U.divide)),
  percentageIn: x => U.lift(Basic.percentage, x)
};

export const Fleet = {
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
  shipsFrom: R.curry((ids, ships) =>
    U.view([L.define([]), L.filter(ship => ids.includes(ship.id))], ships))
};

export const Ships = {};
