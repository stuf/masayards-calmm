// @flow
import React from 'karet';
import * as U from 'karet.util';

import ResourceList from './game/resource-list';
import { Resources as ResourcesM } from './game/meta';

// const resourcesIn = U.view(['game', 'state', 'resources', L.slice(0, 4)]);

// type ResourceProps = {
//   type: string,
//   value: number
// };

// const Resource = ({ type, value }: ResourceProps) =>
//   <div className="item">
//     <div className="ui right floated label">
//       {value}
//     </div>
//     <div className="content">{type}</div>
//   </div>;

const SidebarStyle = {
  height: '100vh',
  overflow: 'scroll'
};

type Props = {
  atom: *,
  state?: *
};

export default ({
  atom,
  state = U.view(['game', 'state'], atom)
}: Props) =>
  <div>
    <aside className="ui grid" style={SidebarStyle}>
      <div className="row">
        <section className="column">
          <div className="ui card">
            <div className="content">
              <div className="header">Resources</div>
            </div>
            <div className="content">
              <div className="ui middle aligned divided relaxed list"
                   style={{ margin: 0, padding: '0.25rem' }}>
                <ResourceList list={ResourcesM.resourcesIn(state)} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </aside>
  </div>;
