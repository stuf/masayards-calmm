// @flow
import React, { fromKefir } from 'karet';
import K, * as U from 'karet.util';

import { Resources as ResourcesM } from './game/meta';

type Props = {
  atom: *,
  state?: *
};

const getRelevantResources = state =>
  K(ResourcesM.resourcesIn(state), list =>
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
    </ul>);

export default ({ atom, state = U.view(['game', 'state'], atom) }: Props) =>
  <aside className="">
    <section className="sidebar__section">
      <div className="header">Resources</div>
      <div className="content">
        {fromKefir(getRelevantResources(state))}
      </div>
    </section>

    <section className="sidebar__section">
      <div className="header">Reparation docks</div>
      <div className="body">
        <ul className="unstyled relaxed">
          <li>Dock 1</li>
          <li>Dock 2</li>
          <li>Dock 3</li>
          <li>Dock 4</li>
        </ul>
      </div>
    </section>

    <section className="sidebar__section">
      <div className="header">Construction docks</div>
      <div className="body">
        <ul className="unstyled relaxed">
          <li>Dock 1</li>
          <li>Dock 2</li>
          <li>Dock 3</li>
          <li>Dock 4</li>
        </ul>
      </div>
    </section>
  </aside>;
