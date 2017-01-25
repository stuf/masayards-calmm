// @flow
import path from 'path';
import { remote } from 'electron';
import React from 'karet';
import * as U from 'karet.util';
import * as R from 'ramda';
import cx from 'classnames';

// $FlowFixMe
import css from './styles.scss';

import Game from '../game';

import TitleBar from './title-bar';
import Sidebar from './sidebar';
import MainView from './main-view';
import StatusBar from './status-bar';

export default class AppUI extends React.Component {
  constructor(props: *) {
    super(props);
    this.atom = props.atom;
    this.states = props.states;
    this.view = props.view;
  }

  render() {
    const { view, atom, states } = this;

    return (
      <div className={cx(css.appUiWrap)}>
        <div className={cx(css.appUi)}>
          <TitleBar />
          <div className={cx(css.uiCols)}>
            <div className={cx(css.uiMain)}>
              <Game atom={view.gameIn(atom)} />
              <MainView atom={view.appUiIn(atom)} />
            </div>
            <div className={cx(css.uiSide)}>
              <Sidebar atom={view.appUiIn(atom)} />
            </div>
          </div>
          <StatusBar atom={view.statusBarIn(atom)} />
        </div>
      </div>
    );
  }
}
