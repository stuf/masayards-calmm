/**
 * @fileoverview
 *  Provide a component to display the main UI in.
 *
 * @flow
 */
import React from 'karet';
import cx from 'classnames';

// $FlowFixMe
import css from './main-view.scss'; // eslint-disable-line flowtype-errors/show-errors

export default ({ atom }: *) =>
  <div className={cx(css.mainView)}>
    <h5>Fleet overview</h5>
    <div className="row">
      <div className={cx(css.col, 'col')}>Fleet #1</div>
      <div className={cx(css.col, 'col')}>Fleet #2</div>
      <div className={cx(css.col, 'col')}>Fleet #3</div>
      <div className={cx(css.col, 'col')}>Fleet #4</div>
    </div>
  </div>;
