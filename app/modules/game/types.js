// @flow
export type EventObjects = {
  view: *,
  contents: *,
  session: *,
  webRequest: *
};

export type MessageHandler = (atom: *, event: *, method: string, params: { [key: string]: * }) => void;

export type HandlerState = {
  debuggerAttached: boolean,
  firstGameLoad: boolean,
  requests: { [requestId: string]: * }
};
