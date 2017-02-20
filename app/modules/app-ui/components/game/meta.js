/* eslint-disable no-underscore-dangle */
import * as U from 'karet.util';
import * as L from 'partial.lenses';
import * as R from 'ramda';

export const Mission = {
  mapState: U.cond([
    [U.equals(0), U.always('idle')],
    [U.equals(1), U.always('on expedition')],
    [U.equals(2), U.always('returned')]
  ])
};

// Fleets

const fleetViewFor = id => ({
  lookup: 'lookup',
  ships: 'ships',
  fleet: ['fleets', id]
});

export const Fleet = {
  missionStateIn: fleet =>
    Mission.mapState(U.view(['mission', 'state', L.define(0)], fleet)),
  Mission: {
    timeLeftIn: U.view(['mission', 'completionTime', L.define(0)]),
    stateIn: fleet =>
      Mission.mapState(U.view(['mission', L.define({}), 'state', L.define(0)], fleet))
  },
  /**
   * @deprecated
   */
  findShipBy: id => L.find(R.whereEq({ id })),


  // Views for displaying fleet entities

  idIn: U.view('id'),
  nameIn: U.view('name'),
  entitiesIn: U.view('fleets'),
  // Subview for a single fleet
  viewIn: U.curryN(2, (k, atom) => U.view(L.pick(fleetViewFor(`${k}`)), atom)),
  keyIn: U.view('nameId'),
  shipIdsIn: U.view(['fleet', 'shipIds', L.define([])])
};

// Ships

export const Ship = {
  idIn: U.view(['player', 'id']),
  healthIn: U.view(['player', 'hp', L.define([0, 0])]),
  in: id => U.view(['ships', `${id}`]), // @todo Isos ftw?

  combView: L.pick({
    lookup: ['lookup', 'ships'],
    player: ['ships', 'player'],
    base: ['ships', 'base']
  }),
  combChooseL: id => L.choose(x => {
    const baseId = L.get(['lookup', `${id}`], x);
    return L.pick({
      base: ['base', `${baseId}`],
      player: ['player', `${id}`]
    });
  }),
  getCombined: U.curryN(2, (state, id) => U.view([Ship.combView, Ship.combChooseL(id)], state))
};

// Materials / resources

export const Resources = {
  resourceStateIn: U.view(['resources']),
  resourcesIn: U.compose(U.values, U.view(['resources']))
};
