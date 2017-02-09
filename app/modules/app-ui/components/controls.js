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

type Fn1 = (a: any) => any;

const isTestEnv = process.env.NODE_ENV === 'test';
const id = R.identity;

const tick = (t: number, f: Fn1 = R.identity) => Kefir.interval(t).toProperty(f);
const timeDelta = (t: number): number => t - +(new Date());

const DurationControl = ({ until, prefix, suffix, interval = 1000, ...props }: *) =>
  <div {...props}>
    {prefix}
    {tick(interval).map(() =>
      U.seq(timeDelta(until),
        U.clamp(0, Infinity),
        U.divide(U.__, 1000),
        U.floor))}
    {suffix}
  </div>;

const DurationDummy = () => <div />;

export const Duration = !isTestEnv ? DurationControl : DurationDummy;

export const KeyValueLabel = ({ key, value, ...props }: *) =>
  <div {...props}>{key}: {value}</div>;
