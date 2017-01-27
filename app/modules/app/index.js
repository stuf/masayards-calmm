/**
 * @fileoverview
 *  Defines the application root component, that will be mounted into the DOM.
 *  The state will be provided through `kefir.atom` and persisting state through
 *  `atom.storage` (see `calmm` for additional information).
 *
 *  Most of the stuff that relates to how the state is created (and stored), along
 *  with the rest of the "back-end" stuff will be relocated to reside outside of the
 *  UI itself.
 *
 *  See `modules/app-ui` for the application front-end.
 *
 * @flow
 */
import { ipcRenderer, remote } from 'electron';
import React from 'karet';
import Atom from 'kefir.atom';
import Storage from 'atom.storage';
import K, * as L from 'partial.lenses';
import * as U from 'karet.util';
import * as R from 'ramda';
import * as S from 'sanctuary';
import cx from 'classnames';

// $FlowFixMe
import css from './styles.scss';

import initialState from './initial-state';
import AppUI from '../app-ui';

/**
 * Define main storage where to persist our data into.
 *
 * @todo Maybe separate game API data storage from this, as it might end up
 *       taking some more space. `Molecule` to the rescue?
 */
const stateStorage = Storage({
  key: 'masayards:state',
  value: initialState,
  Atom,
  storage: localStorage,
  debounce: 5000,
  time: 30 * 60 * 1000
});

const state = stateStorage;

if (process.env.NODE_ENV === 'development') {
  window.state = state;
  window.L = L;
  window.U = U;
  window.R = R;
  window.K = K;
  window.S = S;
}

// @todo Relocate the following to their appropriate locations
/**
 * Define some basic lenses to propagate the desired state.
 *
 * NOTE: Using `L.prop` and `L.compose` here for the root lenses just
 * for the sake of clarity. Otherwise the following should be considered:
 * ```
 *                           L.prop('foo') === 'foo'
 * L.compose(L.prop('foo'), L.prop('bar')) === ['foo', 'bar']
 * ```
 */
const states = {
  game: L.pick({
    game: 'game',
    config: ['config', 'gameUrl']
  }),
  appUi: L.pick({ game: 'game' }),
  statusBar: L.pick({
    networkState: L.compose('application', 'networkStatus', L.define('offline')),
    gameState: L.compose('game', 'status', L.define('disconnected'))
  }),
  application: L.compose('application'),
  action: 'action'
};

/** Specify views for the root components in the application */
const view = {
  gameIn: U.view(states.game),
  appUiIn: U.view(states.appUi),
  statusBarIn: U.view(states.statusBar),
  applicationStateIn: U.view(states.application),
  actionIn: U.view(states.action)
};

view.applicationStateIn(state).log('Application state change');

ipcRenderer.on('online-status-changed', (event, { status }) => {
  view.applicationStateIn(state).modify(x => L.set('networkStatus', status, x));
});

// @todo Clean me up
try {
  // Make sure there isn't a lingering request in the store from last time.
  view.gameIn(state).modify(x =>
    L.remove(['api', L.log(), 'latest', L.required({})], x));
}
catch (e) {
  console.warn('Something went wrong while trying to purge last active state');
}

/**
 * Root application component
 */
export default class App extends React.Component {
  render() {
    return (
      <div className={cx(css.app)}>
        <AppUI atom={state} states={states} view={view} />
      </div>
    );
  }
}
