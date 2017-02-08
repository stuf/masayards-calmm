/* eslint-disable no-underscore-dangle */
// @flow
import React from 'karet';
import * as U from 'karet.util';
import moment from 'moment';

import * as M from './meta';
import { Duration } from '../controls';
import FleetShipList from './fleet-ship-list';

export default ({ fleet, ships, className }: *) =>
  <article className="ui content">
    <div className="name header">{U.view('name', fleet)}</div>
    <div className="state">{M.Fleet.Mission.stateIn(fleet)}</div>
    <div className="timeleft">
      <Duration seconds={M.Fleet.Mission.secondsLeft(fleet)} />
    </div>

    <FleetShipList shipIds={M.Fleet.shipIdsIn(fleet)}
                   ships={ships}
                   className={className} />
  </article>;
