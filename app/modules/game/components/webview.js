/* eslint brace-style: 0, array-bracket-spacing: 0 */
// @flow
import React from 'karet';
import Kefir from 'kefir';
import Atom from 'kefir.atom';
import * as L from 'partial.lenses';
import * as R from 'ramda';
import cx from 'classnames';

import s from './webview.css';
import { getHandler } from './handlers/network';
import cookies from './_cookies';

const intoJson = R.compose(JSON.parse, JSON.stringify);

/**
 * Provide a <GameView /> component that will handle piping data from the API to
 * the appropriate handlers.
 */
export default class GameView extends React.Component {
  constructor(props: *) {
    super(props);
    this.atom = props.gameState;
    this.atom.view(['api', 'requests']).log('GameView requests\t:');
    this.atom.view(['api', 'data']).log('GameView data\t\t:');
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

    contents.on('dom-ready', ev => {
      const injectCss = [
        ['body { overflow: hidden; }'],
        ['#spacing_top { display: none; }'],
        ['#foot { display: none; }'],
        ['#ntg-recommend { display: none; }'],
        ['.area-naviapp { display: none; }'],
        ['.dmm-gtnavi { display: none; }'],
        [
          '#game_frame {',
          'border: solid 1px #f00 !important;',
          'position: absolute;',
          'left: 0;',
          'top: -75px;',
          'width: 800px;',
          'height: 480px;',
          'z-index: 9999;',
          '}'
        ]
      ];
      contents.insertCSS(injectCss.map(line => line.join('')).join(''));
    });

    // Mute the audio by default at start
    contents.setAudioMuted(true);

    console.log('view\t\t= %O', view);
    console.log('contents\t= %O', contents);

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

        const ls = {
          thisRequest: ['api', 'requests', requestId],
          data: ['api', 'data']
        };

        const context = {
          requestId,
          contents,
          thisRequest: this.atom.view(ls.thisRequest),
          data: this.atom.view(ls.data)
        };

        const args = { event, method, params: intoJson(params) };

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

        if (R.test(this.gameUrl, details.url)) {
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
      <div className={cx(s.webview)}>
        <webview {...props} />
      </div>
    );
  }
}
