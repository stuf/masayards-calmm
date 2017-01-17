// @flow
import React from 'karet';
import cx from 'classnames';

import s from './webview.css';

export default class GameView extends React.Component {
  render() {
    return (
      <div className={cx(s.webview)}>
        <webview className={cx(s.webviewPanel)} src="https://www.google.com" />
      </div>
    );
  }
}
