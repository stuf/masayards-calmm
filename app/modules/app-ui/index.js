// @flow
import path from 'path';
import { remote } from 'electron';
import React from 'karet';
import * as U from 'karet.util';
import * as R from 'ramda';
import cx from 'classnames';

// $FlowFixMe
import css from './styles.scss';
import Icon from './components/icon';

export default ({ atom }: *) =>
  <div className={cx(css.appUi)}>
    <div className={cx(css.body)}>
      <div className={cx(css.toolbar)}>
        <div className={cx(css.spacer)}>spacer</div>
        <div className="btn-group">
          <button className="btn btn-primary btn-icon" title="Toggle audio">
            <Icon name="volume_off" type="light" />
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
