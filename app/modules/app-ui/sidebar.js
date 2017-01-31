// @flow
import React from 'karet';
import K, * as U from 'karet.util';
import cx from 'classnames';

import css from './sidebar.css';

const resourcesIn = U.view(['game', 'state', 'resources']);

export default ({ atom }: *) =>
  <aside className={cx(css.sidebar)}>
    <section className={cx(css.sidebarResources)}>
      <div className="ui one column grid" style={{ margin: 0, padding: '0.25rem' }}>
        {U.seq(resourcesIn(atom),
          U.map(r =>
            <div className="ui column" style={{ padding: '0.5rem' }}>
              <div className="ui label">
                <div>{r.value}</div>
                <div className="label">{r.type}</div>
              </div>
            </div>))}
      </div>
    </section>
  </aside>;
