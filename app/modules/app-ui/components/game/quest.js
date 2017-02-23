// @flow
import React from 'karet';
import * as U from 'karet.util';

type Props = {
  id: number,
  title: string,
  state: string
};

export default ({ id, title, state }: Props) =>
  <div className="quest">
    <div className="quest__state">{state}</div>
    <div className="header">{title}</div>
  </div>;
