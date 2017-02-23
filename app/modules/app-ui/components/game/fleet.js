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
  className?: *,
  fleet?: *,
  getCombined?: *,
  shipIds?: *,
  ships?: *
};

export default ({
  view,
  className = 'fleet',
  fleet = U.view('fleet', view),
  shipIds = FleetM.shipIdsIn(view),
  getCombined = ShipM.getCombined(view),
  ships = U.map(getCombined, shipIds),
  ...props
}: Props) =>
  <article className={className} {...props}>
    <div className="item">
      <div className="content">
        <div className="flex__row evenly-spaced fleet__header">
          <div className="flex__col fleet__name header">{FleetM.nameIn(fleet)}</div>
          <div className="flex__col fleet__state">{FleetM.missionStateIn(fleet)}</div>
        </div>
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
