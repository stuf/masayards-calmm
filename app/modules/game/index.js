/* eslint-disable react/require-default-props */
// @flow
import React from 'karet';
import { view } from 'karet.util';

import * as C from './controls';

type Props = {
  atom: *,
  gameAtom?: *
};

export default ({ atom, gameAtom = view('game', atom) }: Props) =>
  <div style={{ height: '480px' }}>
    <C.WebView atom={gameAtom} />
  </div>;
