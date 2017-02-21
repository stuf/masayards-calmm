/* eslint-disable import/prefer-default-export */
import Atom from 'kefir.atom';
import ReactDOM from 'react-dom/server';
import cheerio from 'cheerio';

import stateData from '../state.json';
import stateMock from '../state-mock.json';

export const setup = () => {
  const state = Atom(stateData);
  const full = Atom(stateMock);
  return { state, full };
};

export const render = vdom => {
  const html = ReactDOM.renderToStaticMarkup(vdom);
  return cheerio.load(html).root();
};
