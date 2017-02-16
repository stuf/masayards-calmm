// @flow
import cx from 'classnames';
import React from 'karet';
import * as U from 'karet.util';
import * as L from 'partial.lenses';

// import * as M from './meta';
import ProgressBar from '../ui/progress-bar';

type Props = {
  ship: *,
  className?: string
};

const lText = ([x, y]) => `${x} / ${y}`;

const levelIn = U.view(['player', 'level']);
const nameIn = U.view(['base', 'name']);
const healthIn = U.view(['player', 'hp', L.define([0, 0])]);
const moraleIn = U.view(['player', 'morale']);

const getPercent = U.compose(U.floor, U.multiply(100), U.divide);

const getHealthState = p => {
  switch (getPercent(p)) {
    case p <= 25:
      return 'red';
    case (p > 25 && p <= 50):
      return 'orange';
    case (p > 50 && p <= 75):
      return 'yellow';
    default:
      return 'green';
  }
};

export default ({ ship, className }: Props) =>
  <article className={U.join(' ', ['ship', className])}
           style={{ padding: '0.5rem 0' }}>
    <div className="middle aligned content">
      <div className="ui left floated circular blue inverted segment"
           style={{ padding: '1em', marginBottom: 0 }}>
        {levelIn(ship)}
      </div>
      <div className="header name">{nameIn(ship)}</div>
      <div className={cx(getHealthState(healthIn(ship)))}>
        <ProgressBar value={healthIn(ship)}
                     text={U.always(lText)} />
      </div>
      <div className="meta">{moraleIn(ship)}</div>
    </div>
  </article>;
