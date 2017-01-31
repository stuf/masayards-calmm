// @flow
import React from 'karet';
import cx from 'classnames';

import s from './styles.css';

import WebView from './components/webview';

export default ({ atom, gameDataState = atom.view('game') }: *) =>
  <div className={cx(s.game)}>
    <WebView gameState={gameDataState} />
  </div>;
