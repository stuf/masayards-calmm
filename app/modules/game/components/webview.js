/* eslint brace-style: 0, array-bracket-spacing: 0 */
// @flow
import React from 'karet';
import Kefir from 'kefir';
import Atom from 'kefir.atom';
import * as L from 'partial.lenses';
import * as R from 'ramda';
import cx from 'classnames';

import css from './webview.css';
import { getHandler } from './handlers/network';
import { initializeObserver } from './handlers/game-state';
import cookies from './_cookies';

const intoJson = R.compose(JSON.parse, JSON.stringify);

/**
 * Provide a <GameView /> component that will handle piping data from the API to
 * the appropriate handlers.
 *
 * Due to the way how this needs to be implemented, we need to create a stateful
 * component that uses some component lifecycle hooks for additional functionality.
 */
export default class GameView extends React.Component {
  constructor(props: *) {
    super(props);
    this.atom = props.gameState;

    // Initialize observer for processing API data
    initializeObserver(props.gameState);
    this.atom.view('state').log();
  }

  componentDidMount() {
    console.log('GameView component mounted.');
    this.gameView.addEventListener('dom-ready', this.webViewEventHandler);
  }

  componentWillUnmount() {
    console.log('GameView component will unmount.');
    if (this.debugger) {
      this.debugger.off('message');
    }

    this.firstGameLoad = true;
    this.debuggerAttached = false;
  }

  // Some internal vars
  // ------------------

  // Game handler state
  firstGameLoad: boolean = true;
  debuggerAttached: boolean = false;
  debugger: * = null;
  atom: *;

  // Configuration
  apiDataPrefix: RegExp = /svdata=/;
  pathPrefix: RegExp = /.*\/kcsapi/;
  gameSwfPrefix: RegExp = /kcs\/mainD2/;
  gameUrl: string = 'http://www.dmm.com/netgame/social/-/gadgets/=/app_id=854854/';
  gameUrlRegex: RegExp = new RegExp(this.gameUrl.replace(/\//g, '\/')); // eslint-disable-line no-useless-escape
  urlFilters: Array<string> = [
    this.gameUrl
  ];

  attachDebugger = (attach: *) => {
    attach();
    this.debuggerAttached = true;
  }

  lenses: * = {
    responseUrl: ['response', 'url'],
    requestUrl: ['request', 'url']
  };

  // Event view handler
  webViewEventHandler = (e: *) => {
    const view = e.target;
    const contents = view.getWebContents();
    const { session } = contents;
    const { webRequest } = session;

    // Inject some styles into the loaded webview, so that everything not relevant to
    // the game is hidden, and the game view is positioned to fill the view.
    contents.on('dom-ready', ev => {
      const injectCss = [
        'body { overflow: hidden; }',
        '#spacing_top { display: none; }',
        '#foot { display: none; }',
        '#ntg-recommend { display: none; }',
        '.area-naviapp { display: none; }',
        '.dmm-gtnavi { display: none; }',
        `#game_frame {
          position: absolute;
          left: 0;
          top: -78px;
          width: 800px;
          height: 480px;
          z-index: 9999;
        }`
      ];
      contents.insertCSS(injectCss.join(''));
    });

    // Mute the audio by default at start
    contents.setAudioMuted(true);

    console.log('webview=%O, contents=%O', view, contents);

    // @todo Replace disabling/detaching to an observable's lifecycle instead.
    Kefir.fromEvents(view, 'close').observe({
      value: ev => contents.debugger.sendCommand('Network.disable')
    });

    if (!this.debuggerAttached) {
      try {
        contents.debugger.attach('1.1');
        this.debuggerAttached = true;
      }
      catch (err) {
        console.log('could not attach debugger', err);
      }

      contents.debugger.on('message', (event, method, params) => {
        const handlerFn = getHandler(method);

        if (!handlerFn) {
          return;
        }

        const requestId = params.requestId;

        const context = {
          requestId,
          contents,
          game: this.atom,
          thisRequest: this.atom.view(['api', 'requests', requestId]),
          data: this.atom.view(['api', 'data']),
          state: this.atom.view(['state'])
        };

        const args = { event, method, params: intoJson(params) };

        // Fine, we have a handler for this and some data to use.
        // Perform some dark arts with it.
        handlerFn(context, args);
      });
    }

    // Enable the network monitoring for webview
    contents.debugger.sendCommand('Network.enable');

    // Monitor and hijack the game SWF request
    if (this.firstGameLoad) {
      webRequest.onBeforeRequest((details, cb) => {
        if (!this.firstGameLoad) {
          cb(details);
          return;
        }

        if (R.test(this.gameUrlRegex, details.url)) {
          this.firstGameLoad = false;
          console.log('Inject cookies into webview contents', contents, cookies);
          contents.executeJavaScript(cookies.join('\n'));
        }

        cb(details);
      });
    }
  };

  render() {
    const props = {
      is: true,
      preload: './webview-preload.js',
      ref: c => { this.gameView = c; },
      nodeintegration: true,
      plugins: true,
      partition: 'persist:masayards',
      src: this.gameUrl
    };
    return (
      <div className={cx(css.webview)}>
        <webview {...props} />
      </div>
    );
  }
}
