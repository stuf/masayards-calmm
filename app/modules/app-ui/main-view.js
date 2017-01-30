/**
 * @fileoverview
 *  Provide a component to display the main UI in.
 *
 * @flow
 */
import React from 'karet';
import cx from 'classnames';
import K, * as U from 'karet.util';
import * as L from 'partial.lenses';

import css from './main-view.css';
import * as C from './controls';

const stateIn = U.view(['game', 'state']);
const fleetsIn = U.view(['fleets', L.define([])]);
const shipIdsIn = U.view(['ships', L.define([])]);

const componentStateIn = U.view(L.pick({
  fleets: ['fleets', L.define([])],
  ships: ['ships', L.define([])]
}));

export default ({
  atom,
  state = stateIn(atom),
  fleets = fleetsIn(state),
  shipIds = shipIdsIn(state),
  cs = componentStateIn(state)
}: *) =>
  <div className={cx(css.mainView)}>
    <div className="row">
      {U.seq(fleets, U.indices, U.mapCached(i =>
        <C.Fleet karet-lift key={`fleet-${i}`} fleet={U.view(i, fleets)} shipIds={shipIds} />))}
    </div>
  </div>;
