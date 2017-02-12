// @flow
import Atom from 'kefir.atom';
import Storage from 'atom.storage';
import initialState from './initial-state';

/**
 * Define main storage where to persist our data into.
 */
export default Storage({
  key: 'masayards:stateV3',
  value: initialState,
  Atom,
  storage: localStorage,
  debounce: 5000,
  time: 30 * 60 * 1000
});
