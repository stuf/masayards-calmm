// @flow
import React from 'karet';
import * as U from 'karet.util';
import * as L from 'partial.lenses';

const resourcesIn = U.view(['game', 'state', 'resources', L.slice(0, 4)]);

const Resource = ({ type, value }: { type: string, value: number }) =>
  <div className="item">
    <div className="ui right floated label">
      {value}
    </div>
    <div className="content">{type}</div>
  </div>;

const SidebarStyle = {
  height: '100vh',
  overflow: 'scroll'
};

export default ({
  atom,
  state = U.view(['game', 'state'], atom)
}: *) =>
  <div>
    <aside className="ui grid" style={SidebarStyle}>
      <div className="row">
        <section className="column">
          <div className="ui card">
            <div className="content">
              <div className="header">Resources</div>
            </div>
            <div className="content">
              <div className="ui middle aligned divided relaxed list" style={{ margin: 0, padding: '0.25rem' }}>
                {U.seq(resourcesIn(atom),
                  U.values,
                  U.map(r => <Resource type={r.type} value={r.value} />))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </aside>
  </div>;
