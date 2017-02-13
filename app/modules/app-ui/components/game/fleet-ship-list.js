// @flow
import React from 'karet';
import * as U from 'karet.util';

import * as M from './meta';
import Ship from './ship';

export default ({ shipIds, ships, className }: *) =>
  <div className={U.join(' ', [className])}>
    {/*{U.seq(ships,*/}
      {/*U.map(s =>*/}
        {/*<Ship key={s.id}*/}
              {/*ship={s}*/}
              {/*className="item" />))}*/}
  </div>;
