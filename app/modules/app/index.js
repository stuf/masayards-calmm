/**
 * @fileoverview
 *  Defines the application root component, that will be mounted into the DOM.
 *  The state will be provided through `kefir.atom` and persisting state through
 *  `atom.storage` (see `calmm` for additional information).
 *
 * @flow
 */
import { ipcRenderer } from 'electron';
import React from 'karet';
import Atom from 'kefir.atom';
import Storage, { expireNow } from 'atom.storage';
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
  application: L.compose('application')
};

/**
 * Specify views for the root components in the application
 */
const view = {
  gameIn: s => s.view(states.game),
  appUiIn: s => s.view(states.appUi),
  statusBarIn: s => s.view(states.statusBar),
  applicationStateIn: s => s.view(states.application)
};

view.applicationStateIn(state).log();

ipcRenderer.on('online-status-changed', (event, { status }) => {
  view.applicationStateIn(state).modify(x => L.set('networkStatus', status, x));
});

console.group('State debugging stuff');
console.log('state              = %O', state);
console.log('partial.lenses = L = %O', L);
console.log('karet.util     = U = %O', U);
console.log('ramda          = R = %O', R);
console.log('kefir.combines = K = %O', K);
console.log('sanctuary      = S = %O', S);
console.groupEnd();

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
