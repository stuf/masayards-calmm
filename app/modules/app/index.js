// @flow
import React from 'karet';
import * as U from 'karet.util';

import s from './styles.css';
import Game from '../game';
import AppUI from '../app-ui';

// Initialize state
const initialState = {
  game: {
    connected: false,     // Are we "connected" to the API?
    api: {}
  },
  application: {
    network: 'offline'
  }
};

const state = U.atom(initialState);

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Game atom={state} />
        <AppUI atom={state} />
      </div>
    );
  }
}
