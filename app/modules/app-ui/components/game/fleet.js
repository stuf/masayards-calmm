/* eslint-disable no-underscore-dangle */
// @flow
import React from 'karet';
import * as U from 'karet.util';

import {
  Fleet as FleetM,
  Ship as ShipM
} from './meta';
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
  getCombined = ShipM.getCombined(view),
  shipIds = FleetM.shipIdsIn(view),
  ...props
}: Props) =>
  <article {...props}>
    <div className="item">
      <div className="content">
        <div className="fleet-name header">{FleetM.nameIn(fleet)}</div>
        <div className="fleet-state">{FleetM.missionStateIn(fleet)}</div>
        <div className="timeleft">
          {/* <Duration until={M.Fleet.Mission.timeLeftIn(fleet)} /> */}
        </div>
      </div>
    </div>

    <FleetShipList ships={U.mapCached(getCombined, shipIds)}
                   className="fleet-ship-list ui divided items" />
  </article>;
