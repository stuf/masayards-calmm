import Kefir from 'kefir';
import * as L from 'partial.lenses';
import * as U from 'karet.util';
import * as R from 'ramda';

export const capitalize = s => R.join('', [R.toUpper(R.head(s)), R.tail(s)]);

export const showCurMax = (key, state) => U.seq(U.view(['count', key, L.define([])], state), U.join(' / '));

export const stateIn = U.view(['game', 'state']);

export const timeDelta = t => t - +(new Date());

export const tickUntil = (t, i = 1000) => Kefir.withInterval(i, emitter => {
  const td = timeDelta(t);
  if (td <= 0) {
    emitter.end();
  }
  else {
    emitter.emit(td);
  }
});
