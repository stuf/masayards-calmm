// @flow
import React from 'karet';
import * as U from 'karet.util';
import Atom from 'kefir.atom';
import Storage from 'atom.storage';
import cx from 'classnames';

import s from './styles.css';
import Game from '../game';
import AppUI from '../app-ui';

import StatusBar from './components/status-bar';
import stateSchema from './schema';

const stateStorage = Storage({
  key: 'masayards:state',
  value: stateSchema,
  Atom,
  storage: localStorage,
  debounce: 100
});

stateStorage.log('State storage hit');

// const state = U.atom(stateSchema);
const state = stateStorage;

export default class App extends React.Component {
  render() {
    return (
      <div className={cx(s.app)}>
        <Game atom={state} />
        <AppUI atom={state} />
        <StatusBar atom={state} />
      </div>
    );
  }
}
