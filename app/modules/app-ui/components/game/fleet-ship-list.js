// @flow
import React from 'karet';
import * as U from 'karet.util';

import * as M from './meta';
import Ship from './ship';

type Props = {
  ships: *
};

export default ({ ships, ...props }: Props) =>
  <div {...props}>
    {U.seq(ships,
      U.map(s =>
        <Ship key={s.sortId}
              ship={s}
              className="item" />))}
  </div>;
