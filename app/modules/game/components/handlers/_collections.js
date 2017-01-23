/**
 * @fileoverview
 *  Todo
 *
 * @flow
 */
import * as L from 'partial.lenses';
import { inc } from 'ramda';
import { normalizeMaterialList } from './_normalizers';

export const materials = {
  objectList: (root = L.identity) => L.collect([root, L.elems, L.normalize(normalizeMaterialList)])
};

export default {
  materials
};
