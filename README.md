
[![Build Status](https://travis-ci.org/stuf/masayards-calmm.svg?branch=master)](https://travis-ci.org/stuf/masayards-calmm)
[![codecov](https://codecov.io/gh/stuf/masayards-calmm/branch/master/graph/badge.svg)](https://codecov.io/gh/stuf/masayards-calmm)

# Masayards (Calmm)

Attempt at creating a sane(r) Kancolle viewer client by using [Calmm](https://github.com/calmm-js/documentation) as inspiration,
and using a minimal React stack to avoid a huge mess of boilerplate code.

![Screenshot](assets/screenshot.png)

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
