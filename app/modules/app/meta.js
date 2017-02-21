// @flow
import * as L from 'partial.lenses';

export const State = {
  initialValues: L.pick({
    effect: 'effect',
    latest: ['game', 'api', 'latest', L.required({})],
    debuggerAttached: ['application', 'debuggerAttached', L.required(false)],
    firstGameLoad: ['application', 'firstGameLoad', L.required(true)],
    webView: ['game', 'webview'],
    gameState: ['game', 'status', L.required('disconnected')],
    networkState: ['application', 'network', L.required('offline')]
  }),
  gameStatus: ['game', 'status', L.required('disconnected')],
  applicationStatus: ['application', 'network', L.required('offline')],
  appPaths: ['application', 'paths', L.required({})],
  currentEffect: ['effect']
};

export const resetAppToInitial = (state: *) =>
  state.modify(L.remove(State.initialValues));

export const setGameState = (state: *, gameState: *) => {
  console.log('Set game state', gameState);
  state.modify(L.set(State.gameStatus, gameState));
};

export const setNetworkState = (state: *, networkState: *) => {
  console.log('Set network state', networkState);
  state.modify(L.set(State.applicationStatus, networkState));
};

export const setAppPaths = (state: *, paths: *) => {
  console.log('Set application paths', paths);
  state.modify(L.set(State.appPaths, paths));
};
