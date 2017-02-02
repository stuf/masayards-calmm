// @flow
import React from 'karet';
import * as U from 'karet.util';
import * as L from 'partial.lenses';
import cx from 'classnames';

import css from './sidebar.css';
import * as C from './controls';
import * as M from './meta';

const resourcesIn = U.view(['game', 'state', 'resources']);

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
  <aside className={cx(css.sidebar)}>
    <section>
      <div className="ui middle aligned divided relaxed list" style={{ margin: 0, padding: '0.25rem' }}>
        {U.seq(resourcesIn(atom),
          U.map(r => <Resource type={r.type} value={r.value} />))}
      </div>
      <div className="ui middle aligned divided relaxed list">
        {U.seq(
          fleets,
          U.map(fleet =>
            <C.Fleet fleet={fleet}
                     ships={ships}
                     className="item" />))}
      </div>
    </section>
  </aside>;
