/* eslint-disable no-underscore-dangle */
// @flow
import React from 'karet';
import * as U from 'karet.util';

import * as M from './meta';
import { Duration } from '../controls';
import FleetShipList from './fleet-ship-list';

type Props = {
  view: *,
  fleet?: *,
  getCombined?: *,
  shipIds?: *
};

export default ({
  view,
  fleet = U.view('fleet', view),
  getCombined = M.Ship.getCombined(view),
  shipIds = M.Fleet.shipIdsIn(view),
  ...props
}: Props) =>
  <article {...props}>
    <div className="item">
      <div className="content">
        <div className="fleet-name header">{U.view('name', fleet)}</div>
        <div className="fleet-state">{M.Fleet.Mission.stateIn(fleet)}</div>
        <div className="timeleft">
          {/* <Duration until={M.Fleet.Mission.timeLeftIn(fleet)} /> */}
        </div>
      </div>
    </div>

    <FleetShipList ships={U.map(getCombined, shipIds)}
                   className="fleet-ship-list ui divided items" />
  </article>;
