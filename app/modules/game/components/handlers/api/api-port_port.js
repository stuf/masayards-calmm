// @flow
import * as L from 'partial.lenses';

export default (data: *, state: *, { apiBasic = 0 }: *) =>
  state.view('player')
       .modify(current =>
         L.modify(
           L.pick(),
           data.get(),
           current));
