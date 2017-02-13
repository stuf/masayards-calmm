// @flow
import React from 'karet';
import * as U from 'karet.util';
import * as L from 'partial.lenses';

import Fleet from './game/fleet';

const fleetsIn = U.view('fleets');
const shipsIn = U.view('ships');
const nameIdIn = U.view('nameId');

export default ({ state }: *) =>
  <div style={{ padding: '0 0.5rem' }}>
    <div className="ui top attached segment">
      <div className="ui four column grid">
        {U.seq(fleetsIn(state),
          U.values,
          U.map(i =>
            <Fleet fleet={i}
                   key={nameIdIn(i)}
                   ships={shipsIn(state)}
                   className="column" />))}
      </div>
    </div>
    <div className="ui bottom attached tabular menu">
      <a href="#main" className="active item">Main</a>
      <a href="#quests" className="item">Quests</a>
      <a href="#fleets" className="item">Fleets</a>

      <div className="right menu">
        <a href="#screenshot" className="item">
          <i className="photo icon" />
          Screenshot
        </a>
      </div>
    </div>
  </div>;
