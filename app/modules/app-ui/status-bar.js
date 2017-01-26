// @flow
import React from 'karet';
import * as R from 'ramda';
import * as U from 'karet.util';
import * as L from 'partial.lenses';
import cx from 'classnames';

import s from './status-bar.css';

const networkStatusIn = U.view('networkState');
const gameStatusIn = U.view('gameState');

// @todo Put these two together into one view instead
const shipCountIn = U.view(['game', 'state', L.pick({
  count: ['ships', L.define([]), L.normalize(R.length)],
  maxCount: ['player', 'maxShips']
})]);
const equipmentCountIn = U.view(['game', 'state', L.pick({
  count: ['equipment', L.define([]), L.normalize(R.length)],
  maxCount: ['player', 'maxEquipment']
})]);

export default ({ atom, ships = shipCountIn(atom), equipment = equipmentCountIn(atom) }: *) =>
  <div className={cx(s.statusBar)}>
    <div className={cx(s.counterElement)}>
      Ships: <strong>
        {ships.view('count')}
        {' / '}
        {ships.view('maxCount')}
      </strong>
    </div>
    <div className={cx(s.counterElement)}>
      Equipment: <strong>
        {equipment.view('count')}
        {' / '}
        {equipment.view('maxCount')}
      </strong>
    </div>
    <div className={cx(s.spacer)} />
    <div className={cx(s.statusElement)}>Network: <strong>{networkStatusIn(atom)}</strong></div>
    <div className={cx(s.statusElement)}>Game: <strong>{gameStatusIn(atom)}</strong></div>
  </div>;
