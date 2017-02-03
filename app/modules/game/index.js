// @flow
import React from 'karet';
import { view } from 'karet.util';

import WebView from './components/webview';

/**
 * Wrap WebView in a stateful component if we're in development mode.
 * This avoids to have to reload the entire WebView component, which causes
 * a refresh of the game itself.
 */
class StatefulGameView extends React.Component {
  constructor(props: *) {
    super(props);
    this.atom = props.atom;
  }

  render() {
    return <WebView gameState={view('game', this.atom)} />;
  }
}

export default ({ atom, gameDataState = view('game', atom) }: *) =>
  <div style={{ height: '480px' }}>
    {process.env.NODE_ENV === 'development' ?
      <StatefulGameView atom={atom} /> :
      <WebView gameState={gameDataState} />}
  </div>;
