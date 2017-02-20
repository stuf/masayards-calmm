// @flow
import React from 'karet';
import * as U from 'karet.util';

import Ship from './ship';

type Props = {
  ships: *
};

export default ({ ships, ...props }: Props) =>
  <div {...props}>
    {U.seq(ships,
      U.map(s =>
        <Ship key={s.shipId}
              ship={s}
              className="column" />))}
  </div>;
