// @flow
import React from 'karet';
import * as U from 'karet.util';

import * as M from './meta';

export default ({ ship, className }: *) =>
  <article className={U.join(' ', ['ship', 'column', className])}>
    <div>{M.Ship.idIn(ship)}</div>
    <div>{U.join(' / ', M.Ship.hpIn(ship))}</div>
  </article>;
