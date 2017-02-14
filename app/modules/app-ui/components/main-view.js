// @flow
import React from 'karet';
import * as U from 'karet.util';

import Fleet from './game/fleet';
import { Fleet as FleetM } from './game/meta';

const idIn = U.view('id');

export default ({ atom }: *) =>
  <div style={{ padding: '0 0.5rem' }}>
    <div className="ui top attached segment">
      <div className="ui four column grid">
        {U.seq(FleetM.entitiesIn(atom),
          U.values,
          U.map(f =>
            <Fleet key={f.nameId}
                   view={FleetM.viewIn(f.id, atom)} />))}
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
