// @flow
export type EventObjects = {
  view: WebView,
  contents: WebContents,
  session: WebSession,
  webRequest: WebRequest
};

export type MessageHandler = (atom: *, event: *, method: string, params: { [key: string]: * }) => void;

export type EventHandler = (atom: *) => (e: *) => void;

export type HandlerState = {
  debuggerAttached: boolean,
  firstGameLoad: boolean,
  requests: { [requestId: string]: * }
};

export type WebView = {
  dummy: string
};

export type WebContents = {
  debugger: Debugger,
  injectCss: (styles: string) => void,
  executeJavaScript: (code: string) => void,
  setAudioMuted: (flag: boolean) => void,
  on: (type: string, cb: *) => void
};

export type Debugger = {
  attach: (version: string) => void,
  sendCommand: (command: string, params?: *, cb?: *) => void,
  on: (type: string, cb: *) => void
};

export type WebSession = {
  webRequest: WebRequest
};

export type WebRequest = {
  onBeforeRequest: (fn: (details: *, cb: *) => void) => void
};
