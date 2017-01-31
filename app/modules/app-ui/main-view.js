/**
 * @fileoverview
 *  Provide a component to display the main UI in.
 *
 * @flow
 */
import React from 'karet';
import cx from 'classnames';
import * as U from 'karet.util';
import * as L from 'partial.lenses';

import * as C from './controls';

const stateIn = U.view(['game', 'state']);
const fleetsIn = U.view(['fleets', L.define([])]);
const shipsIn = U.view(['ships', L.define([])]);

export default ({
  atom,
  state = stateIn(atom),
  fleets = fleetsIn(state),
  ships = shipsIn(state)
}: *) =>
  <div className="">
    <div className="ui equal width grid">
      {U.seq(fleets,
        U.indices,
        U.mapCached(i =>
          <C.Fleet fleet={U.view(i, fleets)}
                   ships={ships}
                   className="column" />))}
    </div>
  </div>;
