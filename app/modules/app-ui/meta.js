/**
 * @overview
 * @flow
 */
import K, * as U from 'karet.util';
import * as L from 'partial.lenses';
import * as R from 'ramda';

export const Fleet = {
  nameIn: U.view('name'),
  stateIn: U.view(['mission', L.define({}), 'state', L.valueOr(0)]),
  missionIdIn: U.view(['mission', 'missionId', L.valueOr(0)]),
  mapState: R.cond([
    [R.equals(0), R.always('idle')],
    [R.equals(1), R.always('on expedition')],
    [R.equals(2), R.always('returned')]
  ]),
  shipsFrom: R.curry((ids, ships) =>
    U.view([L.define([]), L.filter(ship => ids.includes(ship.id))], ships))
};

export const Basic = {
  percentage: (current: number, max: number) => `${(current / max) * 100}%`
};

export const Ships = {};
