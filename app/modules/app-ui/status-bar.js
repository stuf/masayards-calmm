// @flow
import React from 'karet';
import * as R from 'ramda';
import * as U from 'karet.util';
import * as L from 'partial.lenses';
import cx from 'classnames';

import css from './status-bar.css';

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
  <div className={cx(css.statusBar)}>
    <div className={cx(css.counterElement)}>
      Ships: <strong>
        {ships.view('count')}
        {' / '}
        {ships.view('maxCount')}
      </strong>
    </div>
    <div className={cx(css.counterElement)}>
      Equipment: <strong>
        {equipment.view('count')}
        {' / '}
        {equipment.view('maxCount')}
      </strong>
    </div>
    <div className={cx(css.spacer)} />
    <div className={cx(css.statusElement)}>Network: <strong>{networkStatusIn(atom)}</strong></div>
    <div className={cx(css.statusElement)}>Game: <strong>{gameStatusIn(atom)}</strong></div>
  </div>;
