// @flow
import React from 'karet';
import * as U from 'karet.util';

import * as C from '../controls';

const fleetsIn = U.view('fleets');

export default ({ atom }: *) =>
  <div style={{ padding: '0 0.5rem' }}>
    <div className="ui top attached tiny tabular menu">
      <a href="#main" className="active item">Main</a>
      <a href="#quests" className="item">Quests</a>
      <a href="#fleets" className="item">Fleets</a>
    </div>
    <div className="ui bottom attached segment">
      <div className="ui four column grid">
        {U.seq(fleetsIn(atom),
          U.map(i =>
            <C.Fleet key={U.view('nameId', i)}
                     fleet={i}
                     ships={U.view('ships', atom)}
                     className="column" />))}
      </div>
    </div>
  </div>;
