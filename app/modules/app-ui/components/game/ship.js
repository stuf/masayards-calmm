// @flow
import cx from 'classnames';
import React from 'karet';
import * as U from 'karet.util';
import * as L from 'partial.lenses';

// import * as M from './meta';
import Progress from '../ui/progress';

type Props = {
  ship: *
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
const getHealthPct = U.compose(getPercent, healthIn);

export default ({ ship }: Props) =>
  <li className="ship">
    <div className="flex__row">
      <div className="flex__col ship__name">{nameIn(ship)}</div>
      <div className="flex__col ship__morale">★ {moraleIn(ship)}</div>
    </div>
    <div className="flex__row">
      <div className="flex__col ship__level">{levelIn(ship)}</div>
      <div>{getHealthPct(ship)}</div>
      <Progress className="flex__col ship__health" value={getHealthState(ship)} />
    </div>
  </li>;
