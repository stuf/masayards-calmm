// @flow
import React from 'karet';
import * as U from 'karet.util';
import * as L from 'partial.lenses';

import { app, remote } from 'electron';
import path from 'path';
import fs from 'fs';

import Fleet from './game/fleet';
import { Fleet as FleetM } from './game/meta';

const mainFleetIn = (atom, fleets = FleetM.entitiesIn(atom)) =>
  U.seq(fleets,
    U.values,
    U.slice(0, 1),
    U.map(f =>
      <Fleet className="fleet"
             key={f.nameId}
             view={FleetM.viewIn(f.id, atom)} />));

const restFleetsIn = (atom, fleets = FleetM.entitiesIn(atom)) =>
  U.seq(fleets,
    U.values,
    U.slice(1, Infinity),
    U.map(f =>
      <li>
        <div style={{ float: 'right', fontSize: '0.625rem' }}>{FleetM.missionStateIn(f)}</div>
        {f.name}
      </li>));

const effScreenshot = () => {
  console.log('effScreenshot');
  const wc = remote.getCurrentWebContents();

  wc.capturePage(image => {
    const png = image.toPNG();
    const targetDir = '/Users/stuf/Desktop';
    const ts = +(new Date());
    const file = path.join(targetDir, `${ts}.png`);
    fs.writeFileSync(file, png);
  });
  return { type: 'EFF_SCREENSHOT' };
};

type Props = {
  state: * // Game state,
};

export default ({ state }: Props) =>
  <div className="sectioned">
    <div className="sectioned__row">
      <div className="sectioned__col toolbar__container-col">
        <div className="toolbar">
          <button disabled>Overview</button>
          <button disabled>Sortie</button>
          <button disabled>Practice</button>
          <button disabled>Maintenance</button>
          <div className="toolbar__spacer" />
          <button onClick={() => effScreenshot()}>Screenshot</button>
        </div>
      </div>
    </div>
    <div className="sectioned__row">
      <div className="sectioned__col">
        <div className="data">
          {mainFleetIn(state)}
        </div>
      </div>

      <div className="sectioned__col"
           style={{ width: '35%' }}>
        <div className="data">
          <div className="header">Fleets</div>
          <div className="body">
            <ul className="unstyled relaxed">
              {restFleetsIn(state)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>;
