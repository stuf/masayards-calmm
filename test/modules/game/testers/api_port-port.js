import { expect } from 'chai';
import * as L from 'partial.lenses';
import * as R from 'ramda';

export default (s, optic, state = s.view(optic).get()) => {
  const p = L.get('player', state);

  const basicProps = ['id', 'name', 'rank', 'level', 'experience', 'coins'];
  const dockProps = ['constructionDocks', 'reparationDocks', 'fleets'];
  const activityProps = ['sortiesWon', 'missionsDone', 'missionsSuccess', 'pvpsWon', 'pvpsLost'];
  const resProps = ['type', 'value'];

  it('should handle a basic player profile', () => {
    expect(L.get(L.props(...basicProps), p)).to.eql({
      id: '123456',
      name: '赤座あかり',
      rank: 4,
      level: 120,
      coins: 90510,
      experience: 2345678
    });
  });

  it('should handle the player\'s dock- and fleet entities', () => {
    expect(L.get(L.props(...dockProps), p)).to.eql({
      constructionDocks: 4,
      reparationDocks: 4,
      fleets: 4
    });
  });

  it('should handle the player\'s activity stats', () => {
    expect(L.get(L.props(...activityProps), p)).to.eql({
      sortiesWon: 12488,
      missionsDone: 12043,
      missionsSuccess: 11919,
      pvpsWon: 4057,
      pvpsLost: 383
    });
  });

  it('should handle the player\'s resource/material state', () => {
    expect(L.collect(['resources',
                      L.values,
                      L.props(...resProps),
                      L.normalize(R.values)], state)).to.eql([
                        ['fuel', 98807],
                        ['ammo', 98959],
                        ['steel', 300000],
                        ['bauxite', 51426],
                        ['instantRepair', 1721],
                        ['constructionMaterials', 800],
                        ['instantConstruction', 2854],
                        ['modernizationMaterials', 108]]);
  });
};
