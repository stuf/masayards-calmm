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
import * as L from 'partial.lenses';
import K, * as U from 'karet.util';
import * as R from 'ramda';
import * as S from 'sanctuary';
import cx from 'classnames';

import css from './styles.css';

import * as M from './meta';
import initialState from './initial-state';
import AppUI from '../app-ui';

/**
 * Define main storage where to persist our data into.
 *
 * @todo Maybe separate game API data storage from this, as it might end up taking some more space. `Molecule` to the rescue?
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
  // noinspection JSAnnotator
  window.L = L;
  // noinspection JSAnnotator
  window.U = U;
  window.R = R;
  window.K = K;
  window.S = S;
}

// @todo Relocate the following to their appropriate locations
/**
 * Define some basic lenses to propagate the desired state.
 */
const states = {
  game: L.pick({
    game: 'game',
    config: ['config', 'gameUrl']
  }),
  appUi: L.pick({ game: 'game' }),
  statusBar: L.pick({
    networkState: ['application', 'networkStatus', L.define('offline')],
    gameState: ['game', 'status', L.define('disconnected')]
  }),
  application: 'application',
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

// Ensure any state that should be clean at startup is just that
M.resetAppToInitial(state);

ipcRenderer.on('online-status-changed', (event, { status }) =>
  M.setGameState(state, status));

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
