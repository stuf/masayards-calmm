// @flow
import * as L from 'partial.lenses';

export const State = {
  initialValues: L.pick({
    effect: 'effect',
    latest: ['game', 'api', 'latest', L.required({})],
    debuggerAttached: ['application', 'debuggerAttached', L.required(false)],
    firstGameLoad: ['application', 'firstGameLoad', L.required(true)]
  }),
  gameStatus: ['game', 'status', L.required('disconnected')],
  applicationStatus: ['application', 'network', L.required('offline')]
};

export const resetAppToInitial = (state: *) => state.modify(L.remove(State.initialValues));

export const setGameState = (state: *, gameState: *) => state.modify(L.set(State.gameStatus), gameState);
