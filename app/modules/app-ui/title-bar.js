// @flow
import React from 'karet';
import cx from 'classnames';

import css from './title-bar.css';

export default ({ text = 'Masayards Calmm' }: *) =>
  <header className={cx(css.titleBar)}>
    <div className={cx(css.titleText)}>{text}</div>
  </header>;
