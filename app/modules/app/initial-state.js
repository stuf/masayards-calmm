/**
 * @fileoverview
 *  Describes the initial/default schema of the state store.
 *
 * @flow
 */
import { Map } from 'immutable';

type GameStatus = 'disconnected' | 'connected';
type NetworkState = 'offline' | 'online';

type ApiData = {
  path?: string,
  time: number,
  data: *,
  postData: *
};

export type Schema = {
  game: {
    status: string | GameStatus,
    config: {
      muteAudio: boolean
    },
    api: {
      requests: { [requestId: string]: * },
      latest: ApiData,
      data: { [path: string]: {
        time: number,
        data: *,
        postData: *
      } }
    },
    state: {
      objects: {
        ships: *,
        equipment: *
      },
      player: *
    }
  },
  application: {
    networkStatus: string | NetworkState,
    titleText?: string
  },
  config: {
    gameUrl: string
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
    config: {
      muteAudio: true
    },
    api: {
      /**
       * Incoming API data.
       */
      requests: {},
      latest: {},
      /**
       * Data received from the API, as key-value pairs according to game path.
       */
      data: {}
    },
    /**
     * Hold the processed game API data here
     */
    state: {
      objects: {
        // Using `Map` for this will also require creating isomorphisms to use lenses.
        ships: new Map()
      },
      player: {
        name: null,
        level: -1
      },
      resources: []
    }
  },
  application: {
    network: 'offline'
  },
  config: {
    gameUrl: 'http://www.dmm.com/netgame/social/-/gadgets/=/app_id=854854/'
  }
};

export default schema;
