/* eslint no-confusing-arrow: 0, no-nested-ternary: 0, react/prop-types: 0 */
/**
 * @overview
 */
import cx from 'classnames';
import React from 'karet';
import K, * as U from 'karet.util';
import * as L from 'partial.lenses';
import * as R from 'ramda';
import * as M from './meta';

const Ships = {
  idIn: U.view('id'),
  hpIn: U.view('hp'),
  moraleIn: U.view('morale')
};

export const Ship = ({ ship, className, hp = U.view('hp', ship) }) =>
  <article className={cx(className, 'ship')}>
    <div>{U.view('id', ship)}</div>
    <div className="ui small progress">
      <div className="bar" />
      <div className="label">{U.join(' / ', hp)}</div>
    </div>
  </article>;

export const Fleet = ({ fleet, ships, shipIds = M.Fleet.shipIdsIn(fleet), className }) =>
  <article className={cx(className)}>
    <div className="name">{U.view('name', fleet)}</div>
    <div className="state">{M.Fleet.mapState(M.Fleet.stateIn(fleet))}</div>
    <div className="ui relaxed divided list">
      {U.seq(shipIds,
        U.map(id =>
          <Ship key={id}
                ship={U.view(M.Fleet.findShipBy(id), ships)}
                className="item" />))}
    </div>
  </article>;

export default { Ship, Fleet };
