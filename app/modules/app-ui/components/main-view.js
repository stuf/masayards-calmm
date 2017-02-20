// @flow
import React from 'karet';
import * as U from 'karet.util';

import Fleet from './game/fleet';
import { Fleet as FleetM } from './game/meta';

type Props = {
  atom: * // Game state
};

const mainFleetIn = (atom, fs = FleetM.entitiesIn(atom)) =>
  U.seq(fs,
    U.values,
    U.slice(0, 1),
    U.map(f =>
      <Fleet className="column"
             key={f.nameId}
             view={FleetM.viewIn(f.id, atom)} />));

const restFleetsIn = (atom, fs = FleetM.entitiesIn(atom)) =>
  U.seq(fs,
    U.values,
    U.slice(1, Infinity),
    U.map(f =>
      <li>
        <div style={{ float: 'right', fontSize: '0.625rem' }}>{FleetM.missionStateIn(f)}</div>
        {f.name}
      </li>));

export default ({ atom }: Props) =>
  <div className="sectioned">
    <div className="sectioned__row">
      <div className="sectioned__col">
        <div className="data">
          {mainFleetIn(atom)}
        </div>
      </div>

      <div className="sectioned__col"
           style={{ width: '35%' }}>
        <div className="data">
          <div className="header">Fleets</div>
          <div className="body">
            <ul className="unstyled relaxed">
              {restFleetsIn(atom)}
            </ul>
          </div>
        </div>

        <div className="data">
          <div className="header">Repairs</div>
          <div className="body">
            <ul className="unstyled relaxed">
              <li>Dock 1</li>
              <li>Dock 2</li>
              <li>Dock 3</li>
              <li>Dock 4</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>;
