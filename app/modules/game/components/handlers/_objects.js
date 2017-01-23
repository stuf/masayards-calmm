/**
 * @fileoverview
 *  Partial lens templates and branching objects.
 *  Also includes some other template stuff.
 *
 * @flow
 */
import * as L from 'partial.lenses';
import { fromPairs } from 'ramda';

// Objects

/**
 * Dictionary of different material types
 */
export const materialTypes = fromPairs([
  [0, '__zero'],
  [1, 'fuel'],
  [2, 'ammo'],
  [3, 'steel'],
  [4, 'bauxite'],
  [5, 'buckets'],
  [6, 'constructionMaterials'],
  [7, 'flamethrowers'],
  [8, 'modernization']
]);

// Templates

/**
 * Material object template
 */
export const material = {
  type: L.prop('api_id'),
  value: L.prop('api_value')
};

/**
 * Basic player profile lens template
 */
export const basicProfile = {
  name: L.prop('api_nickname'),
  level: L.prop('api_level'),
  experience: L.prop('api_experience')
};

/**
 * @path /api_port/port
 */
export const basicProfileBranch = {};

export default {
  materialTypes,

  material,
  basicProfile
};
