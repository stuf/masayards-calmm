// @flow
import React from 'karet';
import * as U from 'karet.util';

// import { Resources as ResourcesM } from './meta';

type Props = {
  view: *
};

export default ({ view, ...props }: Props) =>
  <div {...props}>
    <div>{U.view('type', view)}</div>
    <div>{U.view('value', view)}</div>
  </div>;
