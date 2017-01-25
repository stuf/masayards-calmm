// @flow
import React from 'karet';
import K, * as U from 'karet.util';
import * as L from 'partial.lenses';
import * as R from 'ramda';
import cx from 'classnames';

// $FlowFixMe
import css from './sidebar.scss';

const resourcesIn = U.view(['game', 'state', 'resources']);
const profileIn = U.view(['game', 'state', 'player']);

const Pair = ({ text, value }: *) =>
  <div>
    <div className={cx(css.label)}>{text}</div>
    <div className={cx(css.value)}>{value}</div>
  </div>;

const Generic = ({ test }: *) =>
  <section>
    <Pair text="Derping" value="Herping" />
  </section>;

export default ({ atom }: *) =>
  <aside className={cx(css.sidebar)}>
    {/* Player profile information */}
    <Generic karet-lift test={profileIn(atom)} />
    {K(resourcesIn(atom),
      U.map(r =>
        <div key={r.id}>{r.type} → {JSON.stringify(r.value)}</div>))}
  </aside>;
