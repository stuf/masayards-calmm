/* eslint-disable no-confusing-arrow */
// @flow
import React from 'karet';
import * as U from 'karet.util';

type Props = {
  value: *,
  color?: *,
  label?: string,
  size?: 'tiny' | 'small' | 'standard' | 'large' | 'big',
  text?: *
};

// Probably something to move into meta
const getText = (fn, value) => fn ? fn(value) : null;
const getPercent = U.compose(U.floor, U.multiply(100), U.divide);
const getValue = value => U.defaultTo(0, getPercent(U.head(value), U.last(value)));
const cx = U.compose(U.join(' '), U.reject(U.isNil), U.flatten);

const pct = v => U.join('', [getValue(v), '%']);

export default ({ value, color, size, label, text }: Props) =>
  <div className={cx(['ui', size, color, 'progress'])}>
    <div className="bar"
        data-progress={getValue(value)}
        style={{ width: pct(value) }}>
      {U.ift(text, <div className="progress">{getText(text, value)}</div>)}
    </div>
    {U.ift(label, <div className="label">{label}</div>)}
  </div>;
