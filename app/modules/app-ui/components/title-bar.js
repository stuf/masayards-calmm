// @flow
import React from 'karet';

type Props = {
  text: string
};

export default ({ text = 'Masayards Calmm', ...props }: Props) =>
  <div className="mainview__top" {...props}>
    <nav className="topmenu--right">
      <a className="topmenu__item" href="#settings">Settings</a>
    </nav>
    <nav className="topmenu">
      <a className="topmenu__item active" href="#game">Game</a>
    </nav>
  </div>;
