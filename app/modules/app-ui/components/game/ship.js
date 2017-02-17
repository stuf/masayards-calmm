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

const mapHealthState = U.cond([
  [U.and(U.gt(75), U.lte(100)), U.always('green')],
  [U.and(U.gt(50), U.lte(75)), U.always('yellow')],
  [U.and(U.gt(25), U.lte(50)), U.always('orange')],
  [U.lte(25), U.always('red')],
]);

const getHealthState = U.compose(mapHealthState, U.apply(getPercent), healthIn);

export default ({ ship, className }: Props) =>
  <article className={U.join(' ', ['ship', className])}
           style={{ padding: '0.5rem 0' }}>
    <div className="middle aligned content">
      <div className="ui left floated circular blue inverted segment"
           style={{ padding: '0.9em', marginBottom: 0, fontSize: '0.6em' }}>
        {levelIn(ship)}
      </div>
      <div className="header name">{nameIn(ship)}</div>
      <div className={cx(getHealthState(healthIn(ship)))}>
        <ProgressBar value={U.apply(getPercent, healthIn(ship))} text={U.always(lText)}
                     label="HP" size="tiny" color={getHealthState(ship)} />
      </div>
      <div className="meta">{moraleIn(ship)}</div>
    </div>
  </article>;
