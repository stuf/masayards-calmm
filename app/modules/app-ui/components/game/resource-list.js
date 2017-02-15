// @flow
import React from 'karet';
import * as U from 'karet.util';

import Resource from './resource';

type Props = {
  list: *
};

export default ({ list, ...props }: Props) =>
  <div {...props}>
    {U.seq(list,
      U.indices,
      U.mapCached(i =>
        <Resource view={U.view(i, list)} />))}
  </div>;
