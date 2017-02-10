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
import * as M from './meta';

const isTestEnv = process.env.NODE_ENV === 'test';

const DurationControl = ({ until, prefix, suffix, interval = 1000, ...props }: *) =>
  <div {...props}>
    {prefix}
    {M.tickUntil(until).map(s =>
      U.seq(s,
        U.clamp(0, Infinity),
        U.divide(U.__, 1000),
        U.floor))}
    {suffix}
  </div>;

const DurationDummy = () => <div />;

export const Duration = !isTestEnv ? DurationControl : DurationDummy;

export const KeyValueLabel = ({ key, value, ...props }: *) =>
  <div {...props}>{key}: {value}</div>;
