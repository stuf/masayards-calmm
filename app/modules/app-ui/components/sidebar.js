// @flow
import React from 'karet';
import K, * as U from 'karet.util';

import Resource from './game/resource';
import ResourceList from './game/resource-list';
import { Resources as ResourcesM } from './game/meta';

type Props = {
  atom: *,
  state?: *
};

export default ({ atom, state = U.view(['game', 'state'], atom) }: Props) =>
  <aside className="">
    <section className="sidebar__section">
      <div className="header">Resources</div>
      {K(ResourcesM.resourcesIn(state), list =>
        <ul className="unstyled">
          {U.seq(list,
            U.indices,
            U.slice(0, 4),
            U.mapCached(i => U.view(i, list)),
            U.map(r =>
              <li className="kvf">
                <div className="kvf--key">{r.type}</div>
                <div className="kvf--value">{r.value}</div>
              </li>))}
        </ul>)}
    </section>
  </aside>;
