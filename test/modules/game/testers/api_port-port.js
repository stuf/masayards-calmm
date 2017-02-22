import { expect } from 'chai';
import * as L from 'partial.lenses';

export default (s, optic, state = s.view(optic).get()) => {
  const p = L.get('player', state);
  expect(L.get(L.props('id', 'name', 'rank', 'level', 'experience', 'coins'), p)).to.eql({
    id: '578025',
    name: 'ベガっち',
    rank: 4,
    level: 104,
    coins: 90510,
    experience: 2963929
  });

  expect(L.get(L.props('constructionDocks', 'reparationDocks', 'fleets'), p)).to.eql({
    constructionDocks: 4,
    reparationDocks: 4,
    fleets: 4
  });

  expect(L.get(L.props('sortiesWon', 'missionsDone', 'missionsSuccess', 'pvpsWon', 'pvpsLost'), p)).to.eql({
    sortiesWon: 12488,
    missionsDone: 12043,
    missionsSuccess: 11919,
    pvpsWon: 4057,
    pvpsLost: 383
  });

  const r = L.get('resources', state);
  expect(L.collect([L.values, L.props('type', 'value')], r)).to.eql([
    { type: 'fuel', value: 98807 },
    { type: 'ammo', value: 98959 },
    { type: 'steel', value: 300000 },
    { type: 'bauxite', value: 51426 },
    { type: 'instantRepair', value: 1721 },
    { type: 'constructionMaterials', value: 800, },
    { type: 'instantConstruction', value: 2854, },
    { type: 'modernizationMaterials', value: 108 }
  ]);
};
