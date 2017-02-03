/**
 * @fileoverview
 *  Provide a component to display the main UI in.
 *
 * @flow
 */
import React from 'karet';
import * as U from 'karet.util';
import * as L from 'partial.lenses';

import * as C from './controls';
import * as M from './meta';

const stateIn = ['game', 'state'];
const fleetsIn = (state, x = 0, y = 1) => U.view([stateIn, 'fleets', L.slice(x, y), L.define([])], state);
const shipsIn = U.view([stateIn, 'ships', L.define([])]);

export default ({ atom, fleets = fleetsIn(atom), player = M.Player.profileIn(atom) }: *) =>
  <div className="ui grid">
    <div className="ui four wide column">
      <div className="ui card">
        <div className="content">
          <div className="header">
            {U.view('name', player)}
          </div>
          <div className="meta">level {U.view('level', player)}</div>
        </div>
      </div>
    </div>
    <div className="ui twelve wide column">
      <div className="ui row">
        {U.seq(fleets,
          U.indices,
          U.mapCached(i =>
            <C.Fleet key={i} fleet={U.view(i, fleets)}
                     ships={shipsIn(atom)}
                     className="ui three column grid" />))}
      </div>
    </div>
  </div>;
