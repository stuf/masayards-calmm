/* eslint no-confusing-arrow: 0, no-nested-ternary: 0 */
/**
 * @overview
 * @flow
 */
import cx from 'classnames';
import React from 'karet';
import K, * as U from 'karet.util';
import * as L from 'partial.lenses';
import * as M from './meta';

import css from './controls.css';

const Ships = {
  idIn: U.view('id'),
  hpIn: U.view('hp'),
  moraleIn: U.view('morale')
};

export const Ship = ({ ship, hp = Ships.hpIn(ship) }: *) =>
  <article className={css.ship}>
    <div className={cx(css.shipId)}>{Ships.idIn(ship)}</div>
    <div className="progress">
      <div className={cx(css.shipHp, 'progress-bar')} style={{ width: M.Basic.percentage(...hp) }} />
    </div>
    <div className={cx(css.shipMeta)}>
      Morale: {Ships.moraleIn(ship)}
    </div>
  </article>;

export const Fleet = ({
  fleet,
  ships,
  fleetShips = U.view(['ships', L.define([])], fleet),
  filteredShips = M.Fleet.shipsFrom(fleetShips, ships)
}: *) =>
  <section className={cx('col', css.fleet)} style={{ width: '25%' }}>
    <div className={cx(css.fleetHeading)}>{M.Fleet.nameIn(fleet)}</div>
    <div>
      {K(M.Fleet.stateIn(fleet), M.Fleet.mapState)}
    </div>
    {K(filteredShips, U.map(x => <Ship key={x.id} ship={x} />))}
  </section>;

export const KeyValueField = ({ name, value }: *) =>
  <div className={cx(css.kvField)}>
    <div className={cx(css.kvName)}>{name}</div>
    <div className={cx(css.kvValue)}>{value}</div>
  </div>;

export default { Ship, Fleet, KeyValueField };
