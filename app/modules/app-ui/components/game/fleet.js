/* eslint-disable no-underscore-dangle */
// @flow
import React, { fromKefir } from 'karet';
import K, * as U from 'karet.util';

import {
  Fleet as FleetM,
  Ship as ShipM
} from './meta';
import { Duration } from '../controls';
import FleetShipList from './fleet-ship-list';
import Ship from './ship';

type Props = {
  view: *,
  fleet?: *,
  getCombined?: *,
  shipIds?: *,
  ships?: *
};

export default ({
  view,
  fleet = U.view('fleet', view),
  shipIds = FleetM.shipIdsIn(view),
  getCombined = ShipM.getCombined(view),
  ships = U.map(getCombined, shipIds),
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
      <ul className="ship-list">
        {U.seq(ships,
          U.indices,
          U.mapCached(i =>
            fromKefir(K(U.view(i, ships), s =>
              <Ship key={s.shipId} ship={s} />))))}
      </ul>
    </div>
  </article>;
