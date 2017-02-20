/* eslint-disable no-confusing-arrow */
/**
 * @fileoverview
 *  Provide an entry point component for the main UI in the application.
 *
 * @flow
 */
import React from 'karet';
import { ift, ifte } from 'karet.util';

import Game from '../game';
import Sidebar from './components/sidebar';
import MainView from './components/main-view';
import StatusBar from './components/status-bar';
import * as M from './meta';

const draggableStyles = {
  WebkitAppRegion: 'drag',
  WebkitUserSelect: 'none'
};

const displayWebview = !(process.env.NODE_ENV === 'development' && process.env.MY_HIDE_GAME_WEBVIEW === '1');

type Props = {
  atom: *
};

const AppUIContent = ({ atom }: Props) =>
  <div className="mainview">
    <div className="mainview__top"
         style={{ ...draggableStyles }}>
      <nav className="topmenu">
        <a className="topmenu__item active" href="#game">Game</a>
        <a className="topmenu__item" href="#settings">Settings</a>
      </nav>
    </div>

    <div className="view">
      <div className="view__main">
        <div className="mainview__body">
          <div className="webview__body">
            {ifte(displayWebview, <Game atom={atom} />, <div className="webview__dummy" />)}
          </div>

          <div className="dataview__body">
            <MainView atom={M.Views.gameStateIn(atom)} />
          </div>

          {/* <StatusBar atom={atom} className="ui bottom fixed inverted menu" style={{ ...draggableStyles }} /> */}
        </div>
      </div>

      <div className="view__sidebar">
        <Sidebar atom={atom} />
      </div>
    </div>
  </div>;

/**
 * Define a stateful component if we're developing; HMR doesn't work properly
 * without this.
 * @todo Investigate: Figure out if this is required or if there is an alternative workaround (HMR)
 */
class AppUI extends React.Component {
  constructor(props: *) {
    super(props);
    this.atom = props.atom;
  }

  render() {
    return <AppUIContent atom={this.atom} />;
  }
}

export default ({ ...props }: *) =>
  <div>
    {ifte(process.env.NODE_ENV === 'development', <AppUI {...props} />, <AppUIContent {...props} />)}
  </div>;
