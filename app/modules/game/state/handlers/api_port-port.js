import * as R from 'ramda';
import * as L from 'partial.lenses';
import * as M from '../meta';

const idProp = R.prop('id');

export const optic = L.pick({
  status: 'status',
  player: 'player',
  resources: 'resources',
  fleets: 'fleets',
  ships: L.pick({
    entities: ['ships', 'player'],
    lookup: ['lookup', 'ships'],
    count: ['count', 'ships']
  }),
  equipment: L.pick({
    max: ['count', 'equipment', L.index(1)]
  }),
  furniture: L.pick({
    max: ['count', 'furniture', L.index(1)]
  })
});

/**
 * Gets the basic state of the player's profile and relevant data,
 * including fleets, resources and fleets.
 */
export default ({ path, body }, state) => {
  const ships = L.collect(M.Ships.in('api_ship'), body);
  const player = L.get(M.Player.Profile.in('api_basic'), body);
  const shipCount = R.pair(R.length(ships), R.prop('maxShips', player));

  // @todo See if this could be rearranged a little bit
  // Maybe a `.seq` that sets a simpler part of the structure on each step?
  state.modify(
    L.set(L.pick({
      status: 'status',
      player: 'player',
      resources: 'resources',
      fleets: 'fleets',
      ships: L.pick({
        entities: ['ships', 'player'],
        lookup: ['lookup', 'ships'],
        count: ['count', 'ships']
      }),
      equipment: L.pick({
        max: ['count', 'equipment', L.index(1)]
      }),
      furniture: L.pick({
        max: ['count', 'furniture', L.index(1)]
      })
    }), {
      status: 'ready',
      player: R.omit(['maxShips', 'maxEquipment', 'maxFurniture'], player),
      resources: R.indexBy(idProp, L.collect(M.Player.Materials.in('api_material'), body)),
      fleets: R.indexBy(idProp, L.collect(M.Fleets.in('api_deck_port'), body)),
      ships: {
        entities: R.indexBy(idProp, ships),
        lookup: M.getLUT(ships, 'id', 'shipId'),
        count: shipCount
      },
      equipment: {
        max: R.prop('maxEquipment', player)
      },
      furniture: {
        max: R.prop('maxFurniture', player)
      }
    }));

  return state;
};
