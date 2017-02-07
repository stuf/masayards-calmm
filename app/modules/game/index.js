// @flow
import React from 'karet';
import { view } from 'karet.util';

import * as C from './controls';

export default ({ atom, gameAtom = view('game', atom) }: *) =>
  <div style={{ height: '480px' }}>
    <C.WebView atom={gameAtom} />
  </div>;
