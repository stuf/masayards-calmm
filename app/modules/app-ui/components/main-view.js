// @flow
import React from 'karet';
import * as U from 'karet.util';

import Fleet from './game/fleet';

const fleetsIn = U.view('fleets');

export default ({ state }: *) =>
  <div style={{ padding: '0 0.5rem' }}>
    <div className="ui top attached segment">
      <div className="ui four column grid">
        {U.seq(fleetsIn(state),
          U.map(i =>
            <Fleet key={U.view('nameId', i)}
                   fleet={i}
                   ships={U.view('ships', state)}
                   className="column" />))}
      </div>
    </div>
    <div className="ui bottom attached tiny tabular menu">
      <a href="#main" className="active item">Main</a>
      <a href="#quests" className="item">Quests</a>
      <a href="#fleets" className="item">Fleets</a>
    </div>
  </div>;
