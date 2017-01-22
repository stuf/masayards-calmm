// @flow
import React from 'karet';
import cx from 'classnames';

export default ({ name, type = 'dark' }: *) =>
  <i className={cx('material-icons', `md-${type}`)}>{name}</i>;
