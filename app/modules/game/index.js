// @flow
import React from 'karet';
import * as U from 'karet.util';
import * as L from 'partial.lenses';
import cx from 'classnames';

import s from './styles.css';

import WebView from './components/webview';

export default ({ atom, gameDataState = atom.view('game') }: *) =>
  <div className={cx(s.game)}>
    {/* $FlowFixMe */}
    <WebView gameState={gameDataState} />
  </div>;
