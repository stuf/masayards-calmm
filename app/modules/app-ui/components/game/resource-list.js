// @flow
import React from 'karet';
import * as U from 'karet.util';

type Props = {
  list: *,
  Item: *
};

export default ({ list, Item, ...props }: Props) =>
  <div {...props}>
    {U.seq(list,
      U.indices,
      U.mapCached(i =>
        <Item view={U.view(i, list)} />))}
  </div>;
