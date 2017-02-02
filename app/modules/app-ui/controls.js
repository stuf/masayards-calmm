/* eslint no-confusing-arrow: 0, no-nested-ternary: 0, react/prop-types: 0 */
/**
 * @overview
 */
import cx from 'classnames';
import React from 'karet';
import * as U from 'karet.util';
import * as M from './meta';

export const Quest = ({ quest }) =>
  <article>
    Quest
  </article>;

export const Ship = ({ ship }) =>
  <article className="ship column">
    <div>{M.Ship.idIn(ship)}</div>
    <div>{U.join(' / ', M.Ship.hpIn(ship))}</div>
  </article>;

export const FleetShipList = ({ shipIds, ships, className }) =>
  <div className={className}>
    {U.seq(shipIds,
      U.map(id =>
        <Ship key={id} ship={U.view(M.Fleet.findShipBy(id), ships)} />))}
  </div>;

export const Fleet = ({ fleet, ships, className }) =>
  <article>
    <div>{U.view('name', fleet)}</div>
    <div>{M.Fleet.mapState(M.Fleet.stateIn(fleet))}</div>
    <FleetShipList shipIds={M.Fleet.shipIdsIn(fleet)} ships={ships} Ship={Ship} className={cx(className)} />
  </article>;
