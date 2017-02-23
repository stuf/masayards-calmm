// @flow
import React, { fromKefir } from 'karet';
import K, * as U from 'karet.util';

import { Resources as ResourcesM } from './game/meta';
import Progress from './ui/progress';
import { Quest } from './game';

type Props = {
  atom: *,
  state?: *
};

const getRelevantResources = (state, [r1, r2] = [0, 4]) =>
  K(ResourcesM.resourcesIn(state), list =>
    <ul className="unstyled player--resources">
      {U.seq(list,
        U.indices,
        U.slice(r1, r2),
        U.mapCached(i => U.view(i, list)),
        U.map(r =>
          <li className={`kvf resource--${r.type}`}>
            <div className="kvf--key">{r.type}</div>
            <div className="kvf--value">{r.value}</div>
          </li>))}
    </ul>);

export default ({ atom, state = U.view(['game', 'state'], atom) }: Props) =>
  <aside className="sidebar">
    <section className="sidebar__section">
      <div className="header">Resources</div>
      <div className="content">
        {fromKefir(getRelevantResources(state))}
      </div>
    </section>

    <section className="sidebar__section section--repairdocks">
      <div className="header">Reparation docks</div>
      <div className="body">
        <ul className="unstyled relaxed dock-list">
          {U.seq(U.range(1, 5),
            U.map(i =>
              <li key={i} className="dock-list__item">
                <div className="dock-list__name">Dock {i}</div>
                <Progress value="50" className="dock-list__progress" />
              </li>))}
        </ul>
      </div>
    </section>

    <section className="sidebar__section section--constructiondocks">
      <div className="header">Construction docks</div>
      <div className="body">
        <ul className="unstyled relaxed dock-list">
          {U.seq(U.range(1, 5),
            U.map(i =>
              <li key={i} className="dock-list__item">
                <div className="dock-list__name">Dock {i}</div>
                <Progress value="50" className="dock-list__progress" />
              </li>))}
        </ul>
      </div>
    </section>

    <section className="sidebar__section section--quests">
      <div className="header">Quests</div>
      <div className="body">
        {U.seq(U.view(['quests', 'list'], state),
          U.values,
          U.filter(x => x.state !== 'INCOMPLETE'),
          U.map(q =>
            <Quest key={q.id} {...q} />))}
      </div>
    </section>
  </aside>;
