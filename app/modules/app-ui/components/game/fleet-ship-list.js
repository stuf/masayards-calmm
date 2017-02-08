// @flow
import React from 'karet';
import * as U from 'karet.util';

import * as M from './meta';
import Ship from './ship';

export default ({ shipIds, ships, className }: *) =>
  <div className={U.join(' ', [className])}>
    {U.seq(shipIds,
      U.map(id =>
        <Ship key={id} ship={U.view(M.Fleet.findShipBy(id), ships)} />))}
  </div>;
