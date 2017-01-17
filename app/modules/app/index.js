// @flow
import React from 'karet';
import * as U from 'karet.util';
import cx from 'classnames';

import s from './styles.css';
import Game from '../game';
import AppUI from '../app-ui';

import StatusBar from './components/status-bar';

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
      <div className={cx(s.app)}>
        <Game atom={state} />
        <AppUI atom={state} />
        <StatusBar atom={state} />
      </div>
    );
  }
}
