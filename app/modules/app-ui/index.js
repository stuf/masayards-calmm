/* eslint-disable no-confusing-arrow */
/**
 * @fileoverview
 *  Provide an entry point component for the main UI in the application.
 *
 * @flow
 * @todo Look into replacing classes with stateless components (we have our state atom)
 */
import React from 'karet';

import Game from '../game';
import Sidebar from './sidebar';
import MainView from './main-view';
import StatusBar from './components/status-bar';

const draggableStyles = {
  WebkitAppRegion: 'drag',
  WebkitUserSelect: 'none'
};

const AppUIContent = ({ atom }: *) =>
  <div className="ui content">
    <div className="ui top fixed inverted menu"
         style={{ ...draggableStyles, paddingLeft: '60px' }}>
      <div className="header item">Masayards Calmm</div>
      <div className="right menu">
        <a href="#gotohere" className="item">Settings</a>
      </div>
    </div>

    <div style={{ marginTop: '40px', height: '480px' }}>
      <div className="ui grid">
        <div className="twelve wide column">
          <Game atom={atom} />
        </div>
        <div className="four wide column">
          <Sidebar atom={atom} />
        </div>
      </div>
    </div>

    <MainView atom={atom} />

    <StatusBar atom={atom} className="ui bottom fixed inverted menu" style={{ ...draggableStyles }} />
  </div>;

/**
 * Define a stateful component if we're developing; HMR doesn't work properly
 * without this.
 * @todo Figure out if this is required or if there is an alternative workaround
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
