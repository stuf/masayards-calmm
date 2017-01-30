
[![Build Status](https://travis-ci.org/stuf/masayards-calmm.svg?branch=master)](https://travis-ci.org/stuf/masayards-calmm)
[![codecov](https://codecov.io/gh/stuf/masayards-calmm/branch/master/graph/badge.svg)](https://codecov.io/gh/stuf/masayards-calmm)

# Masayards (Calmm)

This is an attempt at creating a Kancolle viewer client by using the [Calmm.js](https://github.com/calmm-js/documentation) philosophy.

![Screenshot](assets/screenshot.png)

I believe this is a fitting and maybe a little bit unusual of a test case for creating an Electron-based application. There's a whole lot of data that comes from a pretty inconsistent API, so being able to use partial lenses for ensuring that the data is normalized into something usable.

Using [atoms](https://github.com/calmm-js/kefir.atom) and [lenses](https://github.com/calmm-js/partial.lenses), we are able to decompose the application state for use in simple components that don't have to have any knowledge of the world around them. Less boilerplate code with having ditched Redux in this project, maybe we can concentrate on doing stuff, rather than creating actions and reducers. Let's not have to manage that state by hand, shall we?

As a side-note, I did some quick comparisons to an earlier Redux version that was working with immutable data structures and selectors for avoiding unnecessary work—and the improvement can be measured in _orders of magnitude_. Benchmarks need to be done, though, to pull up exact figures.

## Highlights

### Game API handling

Game API data handling is done in [`game-state.js`](app/modules/game/components/handlers/game-state.js), which will look up the handler action to be called, based on the API path.

 * The API data is transformed through defining [a set of templates](app/modules/game/components/handlers/_templates.js) and some common [functions for normalizing the data](app/modules/game/components/handlers/_normalizers.js), used in conjunction with [`partial.lenses`](https://github.com/calmm-js/partial.lenses). Most, if not all, transformation of the received API data is done through these.

---

## Plans / roadmap

Important problems to tackle:

 * Improve handling of data to conform to the initial state spec
   * `L.define` and `L.required` to the rescure, FYI
 * Clean up network event handling code
 * Migrate out of using (S)CSS modules
 * Figure out how to manage and contain effectful UI actions (take a screenshot, muting game audio, export data, etc.)

Some less important things also include:

 * Stop using (S)CSS modules for styles
 * Create a base set of UI styles for use
 * UI customization
 * Configuration views

The things under "_less important_" aren't necessary critical for making a functional application, but which will be the "sprinkle on top".

If you have input on these things, [hit me up on Twitter](https://twitter.com/piparkaq) or [create an issue](issues/) of your thoughts.

---

## Known issues

 * **OSX** - placing the main window in a screen with a different pixel density may cause blurriness in the game.

## Acknowledgements

 * Thanks to chentsulin's excellent [electron-react-boilerplate](https://github.com/chentsulin/electron-react-boilerplate) for a nice base to build an Electron application on.
