/* eslint-disable no-confusing-arrow */
/**
 * @fileoverview
 *  Provide an entry point component for the main UI in the application.
 *
 * @flow
 */
import React, { fromKefir } from 'karet';
import { ift } from 'karet.util';

import Game from '../game';
import Sidebar from './components/sidebar';
import MainView from './components/main-view';
import StatusBar from './components/status-bar';
import TopMenu from './components/top-menu';
import * as M from './meta';

const draggableStyles = {
  WebkitAppRegion: 'drag',
  WebkitUserSelect: 'none'
};

const displayWebview = !(process.env.NODE_ENV === 'development' && process.env.MY_HIDE_GAME_WEBVIEW === '1');

const AppUIContent = ({ atom }: *) =>
  <div className="ui content">
    <div className="ui top fixed inverted menu"
         style={{ ...draggableStyles, paddingLeft: '60px' }}>
      <div className="header item">Masayards Calmm</div>
      <TopMenu className="right menu" />
    </div>

    <div style={{ marginTop: '40px', height: '495px' }}>
      <div className="ui grid">
        <div className="twelve wide column">
          {ift(displayWebview, <Game atom={atom} />)}
        </div>
        <div className="four wide column">
          <Sidebar atom={atom} />
        </div>
      </div>
    </div>

    <MainView state={M.Views.gameStateIn(atom)} />

    <StatusBar atom={atom} className="ui bottom fixed inverted menu" style={{ ...draggableStyles }} />
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
    {process.env.NODE_ENV === 'development' ? <AppUI {...props} /> : <AppUIContent {...props} />}
  </div>;
