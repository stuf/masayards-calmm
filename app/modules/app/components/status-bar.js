// @flow
import React from 'karet';
import * as U from 'karet.util';
import cx from 'classnames';

import s from './status-bar.css';

const applicationStateIn = U.view('application');
const gameStateIn = U.view('game');

const networkStatusIn = U.view(['application', 'network']);
const gameStatusIn = U.view(['game', 'status']);

export default ({ atom }: *) =>
  <div className={cx(s.statusBar)}>
    <div className={cx(s.spacer)}>Status</div>
    <div className={cx(s.statusElement)}>Network: {U.view(['application', 'network'], atom)}</div>
    <div className={cx(s.statusElement)}>Game: {gameStatusIn(atom)}</div>
  </div>;
