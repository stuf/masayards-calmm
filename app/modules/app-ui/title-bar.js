// @flow
import React from 'karet';
import cx from 'classnames';

import css from './title-bar.css';

export default ({ text = 'Masayards Calmm' }: *) =>
  <header className={cx(css.titleBar)}>
    <div className={cx(css.controls, 'btn-toolbar')}>
      <div className="btn-group btn-group-sm mr-2">
        <button className="btn btn-secondary">Screenshot</button>
      </div>
      <div className={cx('btn-group btn-group-sm')}>
        <button className="btn btn-secondary">Reset</button>
        <button className="btn btn-secondary">Settings</button>
      </div>
    </div>
    <div className={cx(css.titleText)}>{text}</div>
  </header>;
