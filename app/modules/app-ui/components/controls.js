/* eslint-disable no-underscore-dangle */
/**
 * @fileoverview
 *  Provide generic UI controls for application use
 *
 * @flow
 */
import React from 'karet';
import * as U from 'karet.util';
import * as R from 'ramda';
import Kefir from 'kefir';

const tick = (t: number) => Kefir.interval(t).toProperty(R.identity);
const timeDelta = (t: number): number => t - +(new Date());

export const KeyValueLabel = ({ key, value, ...props }: *) =>
  <div {...props}>{key}: {value}</div>;

export const Duration = ({ until, interval = 1000, prefix, suffix, ...props }: *) =>
  <div {...props}>
    {prefix}
    {process.env.NODE_ENV !== 'test' ? tick(interval).map(() =>
      U.seq(timeDelta(until),
        U.clamp(0, Infinity),
        U.divide(U.__, 1000),
        U.floor)) : 0} seconds left
    {suffix}
  </div>;
