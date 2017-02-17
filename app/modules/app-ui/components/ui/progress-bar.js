/* eslint-disable no-confusing-arrow */
// @flow
import React from 'karet';
import * as U from 'karet.util';
// import { lift1, always, ift, isNil, compose, divide, multiply, head, last, floor } from 'karet.util';

type Props = {
  // value: [number, number],
  value: *,
  showProgress?: boolean,
  color?: *,
  label?: string,
  size?: 'tiny' | 'small' | 'standard' | 'large' | 'big',
  text?: *,
  percent?: *
};

// Wrap text function invocation to properly fit with optional type of `text`.
// flow can't into understand `U.ift`, so working around it in this case like this,
// while preserving static typing.
const getText = (fn, value) => fn ? fn(value) : null;

const getPercent = U.compose(U.floor, U.multiply(100), U.divide);

const getValue = value => U.defaultTo(0, getPercent(U.head(value), U.last(value)));

const cx = U.compose(U.join(' '), U.reject(U.isNil), U.flatten);

export default ({ value, color, size, label, text, showProgress = true, percent = getValue(value) }: Props) =>
  <div className={cx(['ui', size, color, 'progress'])}>
    <div className="bar"
         data-progress={percent}
         style={{ width: `${percent}%` }}>
      <div className="progress">
        {getText(text, value)}
      </div>
    </div>
    {U.ift(label, <div className="label">{label}</div>)}
  </div>;
