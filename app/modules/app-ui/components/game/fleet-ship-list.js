// @flow
import React from 'karet';
import * as U from 'karet.util';

import * as M from './meta';
import Ship from './ship';

export default ({ ships, ...props }: *) =>
  <div {...props}>
    {U.seq(ships,
      U.map(s =>
        <Ship key={s.sortId}
              ship={s}
              className="item" />))}
  </div>;
