/**
 * @fileoverview
 *  Provide an entry point component for the main UI in the application.
 *
 * @flow
 * @todo Look into replacing classes with stateless components (we have our state atom)
 */
import React from 'karet';
import cx from 'classnames';

import css from './styles.css';

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
          <StatusBar atom={atom} />
        </div>
      </div>
    );
  }
}
