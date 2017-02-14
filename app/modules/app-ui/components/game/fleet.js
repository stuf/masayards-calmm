/* eslint-disable no-underscore-dangle */
// @flow
import React from 'karet';
import * as U from 'karet.util';

import * as M from './meta';
import { Duration } from '../controls';
import FleetShipList from './fleet-ship-list';

export default ({
  view,
  fleet = U.view('fleet', view),
  getCombined = M.Ship.getCombined(view),
  shipIds = M.Fleet.shipIdsIn(view),
  ...props
}: *) =>
  <article {...props}>
    <div className="item">
      <div className="content">
        <div className="name header">{U.view('name', fleet)}</div>
        <div className="state">{M.Fleet.Mission.stateIn(fleet)}</div>
        <div className="timeleft">
          <Duration until={M.Fleet.Mission.timeLeftIn(fleet)} />
        </div>
      </div>
    </div>

    <FleetShipList ships={U.map(getCombined, shipIds)}
                   className="ui divided items" />
  </article>;
