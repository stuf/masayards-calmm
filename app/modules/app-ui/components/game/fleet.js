/* eslint-disable no-underscore-dangle */
// @flow
import React from 'karet';
import * as L from 'partial.lenses';
import K, * as U from 'karet.util';
import * as R from 'ramda';

import * as M from './meta';
import { Duration } from '../controls';
import FleetShipList from './fleet-ship-list';

export default ({ fleet, ships, className }: *) =>
  <article className={className}>
    <div className="item">
      <div className="content">
        <div className="name header">{U.view('name', fleet)}</div>
        <div className="state">{M.Fleet.Mission.stateIn(fleet)}</div>
        <div className="timeleft">
          <Duration until={M.Fleet.Mission.timeLeftIn(fleet)} />
        </div>
      </div>
    </div>

    <FleetShipList shipIds={M.Fleet.shipIdsIn(fleet)}
                   ships={ships}
                   className="ui divided items" />
  </article>;
