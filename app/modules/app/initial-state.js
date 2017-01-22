/**
 * @fileoverview
 *  Describes the initial/default schema of the state store.
 *
 * @flow
 */
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
    objects: {
      ships: *,
      equipment: *
    },
    player: {
      items: Array<*>,
      resources: Array<*>,
      profile: Array<*>,
      docks: Array<*>,
      fleets: Array<*>,
      ships: Array<*>,
      equipment: Array<*>
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
     * Game-related non-player objects; ships, equipment, maps, nodes, etc.
     */
    objects: {
      ships: {},
      equipment: {}
    },
    /**
     * Game-related player objects; profile, fleets, ships, etc.
     */
    player: {
      items: [],
      resources: [],
      profile: [],
      docks: [],
      fleets: [],
      ships: [],
      equipment: []
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
