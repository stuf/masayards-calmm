// @flow
import * as L from 'partial.lenses';

export const State = {
  initialValues: L.pick({
    effect: 'effect',
    latest: ['game', 'api', 'latest', L.required({})],
    debuggerAttached: ['application', 'debuggerAttached', L.required(false)],
    firstGameLoad: ['application', 'firstGameLoad', L.required(true)],
    webView: ['game', 'webview']
  }),
  gameStatus: ['game', 'status', L.required('disconnected')],
  applicationStatus: ['application', 'network', L.required('offline')],
  appPaths: ['application', 'paths', L.required({})],
  currentEffect: ['effect']
};

export const resetAppToInitial = (state: *) => state.modify(L.remove(State.initialValues));

export const setGameState = (state: *, gameState: *) => state.modify(L.set(State.gameStatus, gameState));

export const setAppPaths = (state: *, paths: *) => state.modify(L.set(State.appPaths, paths));
