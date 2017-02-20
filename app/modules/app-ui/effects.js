/**
 * Describe effectful actions for this module
 */
// @flow
import Kefir from 'kefir';
import * as L from 'partial.lenses';
import * as U from 'karet.util';
import { remote } from 'electron';

const webContents = remote.getCurrentWebContents();

const screenshot = effect => {
  console.log('Screenshot effect, effect:', effect);
};

const effects = { screenshot };

const handleEff = atom => action => {
  console.log('Handle effect');
};

export const dispatchEff = (atom: *) => (eff: *) => {
  console.log('dispatchEff =>', atom, eff);
  return atom.modify(L.set('effect', eff));
};

/**
 * Initialize effect handler
 */
export default (atom: *) =>
  atom.observe(handleEff(atom));
