// @flow
import React from 'karet';
import cx from 'classnames';

import s from './webview.css';

export default class GameView extends React.Component {
  render() {
    return (
      <div className={cx(s.webview)}>
        <webview
          is
          nodeintegration="true"
          plugins="true"
          partition="persist:masayards"
          height="480"
          width="800"
          src="https://www.google.com"
        />
      </div>
    );
  }
}
