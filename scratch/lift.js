const U = require('karet.util');
const L = require('partial.lenses');
const Atom = require('kefir.atom').default;

const state = Atom({
  foo: 1,
  bar: 2
});

console.log('state: ', state.get());

const a = x => {
  console.log('within a');
  console.log(x);
  return x;
};

const s = U.seq(
  state.view(L.identity),
  st => {
    console.log('first');
    console.log(U.lift1Shallow(L.set('foo', 123))(st));
    return st;
  },
  st => {
    console.log('second');
    return st;
  }
);

console.log('state: ', state.get());
