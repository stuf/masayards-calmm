/**
 * @fileoverview
 *  Describes the initial/default schema of the state store.
 *
 * @flow
 */
export type Schema = {
  game: {
    status: string,
    api: *
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
     * The game's state data.
     */
    api: {}
  },
  application: {
    network: 'offline'
  }
};

export default schema;
