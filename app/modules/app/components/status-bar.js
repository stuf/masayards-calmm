// @flow
import React from 'karet';
import * as U from 'karet.util';
import cx from 'classnames';

import s from './status-bar.css';

export default ({ atom }: *) =>
  <div className={cx(s.statusBar)}>
    <div className={cx(s.spacer)}>Status</div>
    <div className={cx(s.statusElement)}>Network: online</div>
    <div className={cx(s.statusElement)}>Game: disconnected</div>
  </div>;
