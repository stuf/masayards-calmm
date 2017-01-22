// @flow
import * as R from 'ramda';
import * as tuple from 'flow-static-land/lib/Tuple';

const getHandler = R.cond([
  [R.equals('/api_port/port'), R.always('asd')],
  [R.equals('/api_get_member/questlist'), R.T],
  [R.equals('/api_get_member/material'), R.T],
  [R.equals('/api_get_member/ndock')],
  [R.equals('/api_get_member/preset_deck'), R.T]
]);

const viewApiData = s => s.view(['api', 'latest']);

export default ({ state, apiDataView = viewApiData(state) }: *) =>
  apiDataView.observe({
    value: x => console.log('apiDataview x =', x)
  });
