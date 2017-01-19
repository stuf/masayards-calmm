// @flow
import React from 'karet';
import * as U from 'karet.util';
import cx from 'classnames';

import css from './styles.css';

export default ({ atom }: *) =>
  <div className={cx(css.appUi)}>
    <div className={cx(css.body)}>
      <div className="row">
        <div className="form-group pl-3 pr-2">
          <div className={cx(css.groupLabel)}>Storage</div>
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
