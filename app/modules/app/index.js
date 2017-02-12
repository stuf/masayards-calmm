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
 *   - See `modules/app-ui` for the application front-end.
 *   - See `modules/game` for embedding the game and data hooks
 *
 * @flow
 */
import { ipcRenderer } from 'electron';
import React from 'karet';
import * as L from 'partial.lenses';
import K, * as U from 'karet.util';
import * as R from 'ramda';
import * as S from 'sanctuary';
import cx from 'classnames';

import css from './styles.css';

import * as M from './meta';
import state from './_storage';
import AppUI from '../app-ui';

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

// Ensure any state that should be clean at startup is just that
M.resetAppToInitial(state);

ipcRenderer.on('online-status-changed',
  (event, { status }) => M.setGameState(state, status));

const AppStateless = () =>
  <div className={cx(css.app)}>
    <AppUI atom={state} />
  </div>;

// We'll have to use a stateful React component in case we're in `NODE_ENV === 'development'`,
// otherwise stateless components are just fine.
class AppStateful extends React.Component {
  render() {
    return <AppStateless />;
  }
}

const AppComponent = process.env.NODE_ENV === 'development' ? AppStateful : AppStateless;

export default AppComponent;

