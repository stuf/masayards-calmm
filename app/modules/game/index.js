// @flow
import React from 'karet';
import * as U from 'karet.util';
import cx from 'classnames';

import s from './styles.css';

export default ({ atom }: *) =>
  <div className={cx(s.game)}>
    Game view
  </div>;
