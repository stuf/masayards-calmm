/**
 * Describe effectful actions for this module
 */
import Kefir from 'kefir';
import * as L from 'partial.lenses';
import * as U from 'karet.util';
import * as R from 'ramda';
import { remote } from 'electron';
import fs from 'fs';
import path from 'path';

const webContents = remote.getCurrentWebContents();

const screenshot = (atom, effect) => {
  console.log('Screenshot effect, effect:', effect);
  webContents.capturePage(image => {
    const buf = image.toPNG();
    const file = `${+(new Date()).png}`;
    const dir = '/Users/stuf/Desktop';
    const pngPath = path.join(dir, file);
    fs.writeFile(pngPath, buf, err => {
      if (err) {
        throw err;
      }
      console.log(`File successfully saved as ${pngPath}`);
    });
  });
};

const effects = { screenshot };

const handleEff = atom => eff => {
  console.log('Handle effect', eff);
  if (U.has(eff.type, effects)) {
    effects[eff.type](atom, eff);
  }
};

export const dispatchEff = atom => eff => atom.modify(L.set('effect', eff));

/**
 * Register effect handlers
 */
export default atom =>
  atom.view('effect').observe(handleEff(atom));
