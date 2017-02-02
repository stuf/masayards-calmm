// @flow
import React from 'karet';
import { view } from 'karet.util';
import cx from 'classnames';

import s from './styles.css';

import WebView from './components/webview';

export default ({ atom, gameDataState = view('game', atom) }: *) =>
  <div className={cx(s.game)}>
    <WebView gameState={gameDataState} />
  </div>;
