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

export const as = ({ atom }: *) =>
  <div className={cx(css.appUi)}>
    <div className={cx(css.body)}>
      <div className={cx(css.toolbar)}>
        <div className={cx(css.spacer)}>spacer</div>
        <div className="btn-group">
          <button className="btn btn-primary btn-icon" title="Toggle audio">
            Mute
          </button>
        </div>
      </div>
      <div className="row">
        <div className="form-group pl-3 pr-2">
          <div className={cx(css.groupLabel)}>
            Storage
          </div>
          <div className="btn-group">
            <button className="btn btn-secondary">Debug</button>
            <button className="btn btn-danger">Expire</button>
          </div>
        </div>
        <div className="form-group pl-2 pr-2">
          <div className={cx(css.groupLabel)}>State</div>
          <div className="btn-group">
            <button className="btn btn-secondary">Debug</button>
            <button className="btn btn-danger">Reset</button>
          </div>
        </div>
      </div>
    </div>
  </div>;
