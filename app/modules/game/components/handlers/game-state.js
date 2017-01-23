/* eslint camelcase: 0, no-underscore-dangle: 0 */
/**
 * @fileoverview
 *  Process incoming API data for use in the application.
 *
 * @flow
 */
import K, * as U from 'karet.util';
import * as R from 'ramda';
import * as L from 'partial.lenses';
import * as S from 'sanctuary';

import { materials } from './_collections';
import { basicProfile } from './_objects';
import { normalizeMaterialList } from './_normalizers';

const sortById = R.sortBy(R.prop('api_id'));
const headWhenArray = R.when(R.is(Array), R.head);

// Define views
const view = {
  latestIn: U.view(['api', 'latest']),
  stateIn: U.view('state')
};

const apiView = {
  basic: {
    profileIn: U.view(['api_data', 'api_basic', L.pick(basicProfile)])
  }
};

/**
 * Event handler map
 *
 * @todo Rewrite view lenses to work in a unified manner, e.g.
 *       not be separate views.
 */
const handlers = {
  '/api_port/port': ({ path, body, postBody }, atom) => {
    const state = atom.view('state');

    const getPlayer = L.get(['api_data', 'api_basic', L.pick(basicProfile)]);
    const getFleets = L.get(['api_data', 'api_deck_port']);
    const getResources = L.get(['api_data', 'api_material']);
    const getShips = R.compose(R.map(headWhenArray), R.groupBy(R.prop('api_id')), L.get);

    state.view('player').modify(cs =>
      L.set(L.identity, getPlayer(body), cs));

    state.view('resources').modify(cs =>
      L.set(L.identity, getResources(body), cs));

    state.view('fleets').modify(cs =>
      L.set(L.identity, getFleets(body), cs));

    state.view('ships').modify(cs =>
      L.set(L.identity, getShips([
        'api_data',
        'api_ship',
        L.normalize(R.sortBy(R.prop('api_id')))
      ], body), cs));
  },
  // '/api_get_member/material': () => {},
  // '/api_get_member/questlist': () => {}
};

const handleEvent = atom => x => {
  const state = view.stateIn(atom);
  const { path, time, body, postBody } = x;
  console.log('game state got value:', x);

  if (R.has(path, handlers)) {
    R.apply(R.prop(path, handlers), [x, atom]);
  }
};

export const initializeObserver = (atom: *) =>
  view.latestIn(atom)
      .observe(handleEvent(atom));

export const dummy = 0;
