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

const interval = t => Kefir.interval(t).toProperty(R.identity);
const timeDelta = t => t - +(new Date());

export const KeyValueLabel = ({ key, value, ...props }: *) =>
  <div {...props}>{key}: {value}</div>;

export const Duration = ({ until, recalcInterval = 500 }: *) =>
  <div>
    {interval(1000).map(() =>
      U.seq(timeDelta(until),
        U.clamp(0, Infinity),
        U.divide(U.__, 1000),
        U.floor))} seconds left
  </div>;
