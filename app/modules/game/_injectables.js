// @flow

/**
 * Which cookies to inject into the `webview` to make it look like we're not playing from abroad.
 */
export const cookies: Array<string> = [
  'document.cookie = "cklg=welcome;expires=Sun, 09 Feb 2019 09:00:09 GMT;domain=.dmm.com;path=/";',
  'document.cookie = "cklg=welcome;expires=Sun, 09 Feb 2019 09:00:09 GMT;domain=.dmm.com;path=/netgame/";',
  'document.cookie = "cklg=welcome;expires=Sun, 09 Feb 2019 09:00:09 GMT;domain=.dmm.com;path=/netgame_s/";',
  'document.cookie = "ckcy=1;expires=Sun, 09 Feb 2019 09:00:09 GMT;domain=.dmm.com;path=/";',
  'document.cookie = "ckcy=1;expires=Sun, 09 Feb 2019 09:00:09 GMT;domain=.dmm.com;path=/netgame/";',
  'document.cookie = "ckcy=1;expires=Sun, 09 Feb 2019 09:00:09 GMT;domain=.dmm.com;path=/netgame_s/";',
  'document.cookie = "ckcy=1;expires=Sun, 09 Feb 2019 09:00:09 GMT;domain=osapi.dmm.com;path=/"',
  'document.cookie = "ckcy=1;expires=Sun, 09 Feb 2019 09:00:09 GMT;domain=203.104.209.7;path=/"',
  'document.cookie = "ckcy=1;expires=Sun, 09 Feb 2019 09:00:09 GMT;domain=www.dmm.com;path=/netgame/"',
  'document.cookie = "ckcy=1;expires=Sun, 09 Feb 2019 09:00:09 GMT;domain=log-netgame.dmm.com;path=/"',
];

/**
 * Styles to inject into the `webview` containing the game.
 * Hides unnecessary things from the game view.
 */
export const styles: Array<string> = [
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
