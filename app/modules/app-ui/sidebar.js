// @flow
import React from 'karet';
import K, * as U from 'karet.util';
import cx from 'classnames';

// $FlowFixMe
import css from './sidebar.scss';

const stateIn = U.view(['game', 'state']);

export default ({ atom }: *) =>
  <aside className={cx(css.sidebar)}>
    <pre>{K(stateIn(atom), s => JSON.stringify(s, null, 2))}</pre>
  </aside>;
