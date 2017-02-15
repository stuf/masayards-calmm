// @flow
import React from 'karet';
import * as U from 'karet.util';

import * as M from './meta';

type Props = {
  atom: *,
  state?: *
};

export default ({ atom, state = M.stateIn(atom), ...props }: Props) =>
  <div {...props}>
    <div className="item header">{U.view(['player', 'name'], state)}</div>
    <div className="item">Level: {U.view(['player', 'level'], state)}</div>
    <div className="item">Ships: {M.showCurMax('ships', state)}</div>
    <div className="item">Equipment: {M.showCurMax('equipment', state)}</div>

    <div className="right menu">
      <div className="item">Network: {U.view(['application', 'network'], atom)}</div>
      <div className="item">Game status: {U.view(['game', 'status'], atom)}</div>
    </div>
  </div>;
