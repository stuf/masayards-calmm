// @flow
import React from 'karet';

type Props = {
  atom: *
};

export default ({ atom, ...props }: Props) =>
  <div {...props}>
    <a href="#settings" className="item">
      <i className="setting icon" />
      Settings
    </a>
  </div>;
