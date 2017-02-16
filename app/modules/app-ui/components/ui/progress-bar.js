// @flow
import React from 'karet';
import { ift, isNil, compose, divide, multiply, head, last, floor } from 'karet.util';

type Props = {
  value: [number, number],
  showProgress?: boolean,
  label?: string,
  text?: *
};

// Wrap text function invocation to properly fit with optional type of `text`.
// flow can't into understand `U.ift`, so working around it in this case like this,
// while preserving static typing.
const getText = (text, value) => {
  const t = text;
  if (t) {
    return t(value);
  }
  return null;
};

const getPercent = compose(floor, multiply(100), divide);

const getValue = value => getPercent(head(value), last(value));

export default ({ value, label, text, showProgress = true }: Props) =>
  <div className="ui">
    <div className="bar" data-progress={getValue(value)}>
      <div className="progress"
           style={{ width: `${getValue(value)}%` }}>{(!isNil(text) && showProgress) ? getText(text, value) : null}</div>
    </div>
    {ift(label, <div className="label">{label}</div>)}
  </div>;
