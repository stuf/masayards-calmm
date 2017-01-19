// @flow
import React from 'karet';
import * as U from 'karet.util';
import cx from 'classnames';

import s from './status-bar.css';

const networkStatusIn = U.view('networkState');
const gameStatusIn = U.view('gameState');

export default ({ atom }: *) =>
  <div className={cx(s.statusBar)}>
    <div className={cx(s.counterElement)}>Ships: 0 / 300</div>
    <div className={cx(s.counterElement)}>Equipment: 0 / 900</div>
    <div className={cx(s.spacer)} />
    <div className={cx(s.statusElement)}>Network: {networkStatusIn(atom)}</div>
    <div className={cx(s.statusElement)}>Game: {gameStatusIn(atom)}</div>
  </div>;
