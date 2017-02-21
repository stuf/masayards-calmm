// @flow
import React from 'karet';
import * as U from 'karet.util';

type Props = {
  value: *,
  className?: *
};

export default ({ value, className, ...props }: Props) =>
  <div className={U.join(' ', [className, 'progress-bar'])}>
    <div className="progress-bar__indicator" style={{ width: `${value}%` }} />
  </div>;
