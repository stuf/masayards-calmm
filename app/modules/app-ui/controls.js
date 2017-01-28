/**
 * @overview
 * @flow
 */
import React from 'karet';
import * as L from 'partial.lenses';
import * as R from 'ramda';

export const dummy = 0;

export const Fleet = ({ fleet }: *) =>
  <section>
    <h5>Fleet #x</h5>
  </section>;

export const KeyValueField = ({ name, value }: *) =>
  <div>
    <div>{name}</div>
    <div>{value}</div>
  </div>;
