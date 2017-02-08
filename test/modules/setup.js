/* eslint-disable import/prefer-default-export */
import Atom from 'kefir.atom';
import ReactDOM from 'react-dom/server';
import cheerio from 'cheerio';

import stateData from '../state.json';

export const setup = () => {
  const state = Atom(stateData);
  return { state };
};

export const render = vdom => {
  const html = ReactDOM.renderToStaticMarkup(vdom);
  return cheerio.load(html).root();
};
