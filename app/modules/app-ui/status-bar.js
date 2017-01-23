// @flow
import React from 'karet';
import * as U from 'karet.util';
import cx from 'classnames';

import s from './status-bar.css';

const networkStatusIn = U.view('networkState');
const gameStatusIn = U.view('gameState');

export default ({ atom }: *) =>
  <div className={cx(s.statusBar)}>
    <div className={cx(s.counterElement)}>Ships: <strong>0 / 300</strong></div>
    <div className={cx(s.counterElement)}>Equipment: <strong>0 / 900</strong></div>
    <div className={cx(s.spacer)} />
    <div className={cx(s.statusElement)}>Network: <strong>{networkStatusIn(atom)}</strong></div>
    <div className={cx(s.statusElement)}>Game: <strong>{gameStatusIn(atom)}</strong></div>
  </div>;
