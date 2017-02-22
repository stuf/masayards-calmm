import * as L from 'partial.lenses';

import {
  baseShip,
  shipType,
  equipment,
  equipmentType,
  furnitureEntity,
  furnitureGraphic,
  mission,
  mapArea,
  mapInfo,
  mapMusic
} from '../_templates';
import { collectWithIndex } from '../meta';

export const optic = L.pick({
  status: 'status',
  ships: ['ships', 'base'],
  shipTypes: ['ships', 'types'],
  equipment: ['equipment', 'base'],
  equipmentTypes: ['equipment', 'types'],
  maps: ['maps', L.props('areas', 'info', 'music')],
  furniture: ['furniture', L.props('base', 'graphics')]
});

/**
 * Gets the initial game data on start
 */
export default ({ path, body }, state) => {
  const result = {
    status: 'starting',
    ships: collectWithIndex(['api_mst_ship', L.elems, L.pick(baseShip)], body),
    shipTypes: collectWithIndex(['api_mst_stype', L.elems, L.pick(shipType)], body),
    equipment: collectWithIndex(['api_mst_slotitem', L.elems, L.pick(equipment)], body),
    equipmentTypes: collectWithIndex(['api_mst_slotitem_equiptype', L.elems, L.pick(equipmentType)], body),
    missions: collectWithIndex(['api_mst_mission', L.elems, L.pick(mission)], body),
    maps: {
      areas: collectWithIndex(['api_mst_maparea', L.elems, L.pick(mapArea)], body),
      info: collectWithIndex(['api_mst_mapinfo', L.elems, L.pick(mapInfo)], body),
      music: collectWithIndex(['api_mst_mapbgm', L.elems, L.pick(mapMusic)], body)
    },
    furniture: {
      base: collectWithIndex(['api_mst_furniture', L.elems, L.pick(furnitureEntity)], body),
      graphics: collectWithIndex(['api_mst_furnituregraph', L.elems, L.pick(furnitureGraphic)], body)
    }
  };

  state.modify(L.set(optic, result));

  return state;
};
