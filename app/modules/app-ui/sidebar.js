// @flow
import React from 'karet';
import * as U from 'karet.util';
import * as L from 'partial.lenses';
import cx from 'classnames';

import css from './sidebar.css';
import * as C from './controls';

const resourcesIn = U.view(['game', 'state', 'resources', L.slice(0, 4)]);

const Resource = ({ type, value }: { type: string, value: number }) =>
  <div className="item">
    <div className="ui right floated label">
      {value}
    </div>
    <div className="content">{type}</div>
  </div>;

export default ({
  atom,
  state = U.view(['game', 'state'], atom),
  fleets = U.view(['fleets', L.slice(1, undefined)], state),
  ships = U.view('ships', state)
}: *) =>
  <div>
    <aside className={cx(css.sidebar, 'ui grid')}>
      <div className="row">
        <section className="column">
          <div className="ui card">
            <div className="content">
              <div className="header">Resources</div>
            </div>
            <div className="content">
              <div className="ui middle aligned divided relaxed list" style={{ margin: 0, padding: '0.25rem' }}>
                {U.seq(resourcesIn(atom),
                  U.map(r => <Resource type={r.type} value={r.value} />))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </aside>
    <div>
      {U.seq(
        fleets,
        U.indices,
        U.map(i =>
          <C.Fleet fleet={U.view(i, fleets)}
                  ships={ships}
                  className="ui divided list" />))}
    </div>
  </div>;
