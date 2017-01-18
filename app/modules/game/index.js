// @flow
import React from 'karet';
import * as U from 'karet.util';
import cx from 'classnames';

import s from './styles.css';

import WebView from './components/webview';

export default ({ atom, requestAtom = atom.view(['game', 'api']) }: *) =>
  <div className={cx(s.game)}>
    {/* $FlowFixMe */}
    <WebView requestAtom={requestAtom} />
  </div>;
