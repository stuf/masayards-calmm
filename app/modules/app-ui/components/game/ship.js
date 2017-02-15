// @flow
import React from 'karet';
import * as U from 'karet.util';

import * as M from './meta';

type Props = {
  ship: *,
  className?: string
};

export default ({ ship, className }: Props) =>
  <article className={U.join(' ', ['ship', className])}
           style={{ padding: '0.5rem 0' }}>
    <div className="middle aligned content">
      <div className="ui left floated circular blue inverted segment"
           style={{ padding: '1em', marginBottom: 0 }}>
        {U.view(['player', 'level'], ship)}
      </div>
      <div className="header name">{U.view(['base', 'name'], ship)}</div>
      <div className="meta">{U.join(' / ', M.Ship.hpIn(ship))}</div>
    </div>
  </article>;
