// @flow
import React from 'karet';

export default ({ atom, ...props }: *) =>
  <div {...props}>
    <a href="#settings" className="item">
      <i className="setting icon" />
      Settings
    </a>
  </div>;
