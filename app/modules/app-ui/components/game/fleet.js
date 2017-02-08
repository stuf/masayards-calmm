// @flow
import React from 'karet';
import * as U from 'karet.util';

import * as M from './meta';
import FleetShipList from './fleet-ship-list';

export default ({ fleet, ships, className }: *) =>
  <article className="ui content">
    <div className="name header">{U.view('name', fleet)}</div>
    <div className="state">{M.Fleet.Mission.stateIn(fleet)}</div>
    <div className="timeleft">{M.Fleet.Mission.timeLeftIn(fleet)}</div>

    <FleetShipList shipIds={M.Fleet.shipIdsIn(fleet)}
                   ships={ships}
                   className={className} />
  </article>;
