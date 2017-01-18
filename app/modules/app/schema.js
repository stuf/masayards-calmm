/**
 * @fileoverview
 *  Describes the initial/default schema of the state store.
 *
 * @flow
 */
export type Schema = {
  game: {
    status: string,
    api: *,
    data: *
  },
  application: {
    network: string
  }
};

const schema = {
  /**
   * State relevant to the game's state itself
   */
  game: {
    /**
     * Are we "connected" to the API, e.g. have we received any data successfully?
     */
    status: 'disconnected',
    /**
     * Incoming API data.
     */
    api: {},
    /**
     * The game's state data.
     */
    data: {}
  },
  application: {
    network: 'offline'
  }
};

export default schema;
