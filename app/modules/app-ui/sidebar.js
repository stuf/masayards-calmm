// @flow
import React from 'karet';
import K, * as U from 'karet.util';
import * as L from 'partial.lenses';
import * as R from 'ramda';
import cx from 'classnames';

// $FlowFixMe
import css from './sidebar.scss';

import * as C from './controls';

const resourcesIn = U.view(['game', 'state', 'resources']);
const profileIn = U.view(['game', 'state', 'player']);

export default ({ atom }: *) =>
  <aside className={cx(css.sidebar)}>
    {K(resourcesIn(atom),
      U.map(r => <C.KeyValueField name={r.type} value={r.value} />))}
  </aside>;
