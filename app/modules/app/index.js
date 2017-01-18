// @flow
import React from 'karet';
import * as U from 'karet.util';
import Atom from 'kefir.atom';
import Storage from 'atom.storage';

import stateSchema from './schema';

import Game from '../game';
import AppUI from '../app-ui';
import StatusBar from './components/status-bar';

const stateStorage = Storage({
  key: 'masayards:state',
  value: stateSchema,
  Atom,
  storage: localStorage,
  debounce: 100
});

const state = stateStorage;

export default class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Game atom={state} />
        <AppUI atom={state} />
        <StatusBar atom={state} />
      </div>
    );
  }
}
