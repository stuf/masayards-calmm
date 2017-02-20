// @flow
import React from 'karet';
import * as U from 'karet.util';

import * as M from './meta';

type Props = {
  atom: *,
  state?: *
};

export default ({ atom, state = M.stateIn(atom) }: Props) =>
  <div className="bottom__section">
    <div className="section__element"><strong>{U.view(['player', 'name'], state)}</strong></div>
    <div className="section__element">Level: <strong>{U.view(['player', 'level'], state)}</strong></div>
    <div className="section__element">Ships: <strong>{M.showCurMax('ships', state)}</strong></div>
    <div className="section__element">Equipment: <strong>{M.showCurMax('equipment', state)}</strong></div>

    <div className="section__spacer" />

    <div className="section__element">Network: <strong>{U.view(['application', 'network'], atom)}</strong></div>
    <div className="section__element">Game status: <strong>{U.view(['game', 'status'], atom)}</strong></div>
  </div>;
