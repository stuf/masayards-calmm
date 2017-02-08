
[![Travis Build Status](https://travis-ci.org/stuf/masayards-calmm.svg?branch=master)](https://travis-ci.org/stuf/masayards-calmm)
[![Appveyor Build status](https://ci.appveyor.com/api/projects/status/fo49nj630413db07?svg=true)](https://ci.appveyor.com/project/stuf/masayards-calmm)
[![codecov](https://codecov.io/gh/stuf/masayards-calmm/branch/master/graph/badge.svg)](https://codecov.io/gh/stuf/masayards-calmm)

# Masayards (Calmm)

This is an attempt at creating a Kancolle viewer client by using the [Calmm.js](https://github.com/calmm-js/documentation) philosophy.

![Screenshot](assets/screenshot-v2.png)

I believe this is a fitting and maybe a little bit unusual of a test case for creating an Electron-based application. There's a whole lot of data that comes from a pretty inconsistent API, so being able to use partial lenses for ensuring that the data is normalized into something usable.

## Highlights

### Game API handling

Game API data handling is done in [`game/state/index.js`][game state handler], which will look up the handler action to be called, based on the API path.

 * The API data is transformed through defining [a set of templates][API data templates] and some common [functions for normalizing the data][API data normalizers], used in conjunction with [`partial.lenses`][partial.lenses]. Most, if not all, transformation of the received API data is done through these.

[game state handler]: app/modules/game/state/index.js
[API data templates]: app/modules/game/state/_templates.js
[API data normalizers]: app/modules/game/state/_normalizers.js
[partial.lenses]: https://github.com/calmm-js/partial.lenses

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

If you have input on these things, [hit me up on Twitter][@piparkaq] or [create an issue][issues] of your thoughts.

[@piparkaq]: https://twitter.com/piparkaq
[issues]: issues/

---

## Known issues

 * **OSX** - placing the main window in a screen with a different pixel density may cause blurriness in the game.

## Acknowledgements

 * Thanks to chentsulin's excellent [electron-react-boilerplate](https://github.com/chentsulin/electron-react-boilerplate) for a nice base to build an Electron application on.
