/**
 * @fileoverview
 *  Process incoming API data for use in the application.
 *
 * @flow
 */
import K, * as U from 'karet.util';
import * as R from 'ramda';
import * as L from 'partial.lenses';
import invariant from 'invariant';

// API event handlers

/**
 * Handle incoming API data.
 */
export const value = (...args: *[]) =>
  console.log('>> apiState:value:', ...args);

/**
 * Handle state gracefully from errors.
 */
export const error = (...args: *[]) =>
  console.error('>> apiState:error:', ...args);

/**
 * Perform cleanup if required when the API data stream ends.
 */
export const end = (...args: *[]) =>
  console.info('>> apiState:end:', ...args);

// Main handler

/**
 * Initialize the game state handler.
 */
export const initialize = (state: *, apiStateLens: *) => {
  // Attach handlers
  invariant(state, 'Initializing handler requires a state to observe');
  invariant(apiStateLens, 'Observing state requires a lens to the API data stream');

  console.info('Initialize game state handler.');
  state.view(apiStateLens).observe({ value, error, end });
};
