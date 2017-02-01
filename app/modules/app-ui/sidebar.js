// @flow
import React from 'karet';
import K, * as U from 'karet.util';
import cx from 'classnames';

import css from './sidebar.css';

const resourcesIn = U.view(['game', 'state', 'resources']);

const Resource = ({ type, value }: { type: string, value: number }) =>
  <div className="item">
    <div className="ui right floated label">
      {value}
    </div>
    <div className="content">{type}</div>
  </div>;

export default ({ atom }: *) =>
  <aside className={cx(css.sidebar)}>
    <section>
      <div className="ui middle aligned divided relaxed list" style={{ margin: 0, padding: '0.25rem' }}>
        {U.seq(resourcesIn(atom),
          U.map(r => <Resource type={r.type} value={r.value} />))}
      </div>
    </section>
  </aside>;
