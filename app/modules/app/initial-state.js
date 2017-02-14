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
  body: *,
  postBody: *
};

type Action = { type: string, payload?: *, error?: * };
type GameModeEnum = 'idle' | 'in_sortie' | 'in_practice' | 'ship_critical';
type GameMode = GameModeEnum | Array<GameModeEnum>;

/**
 * @todo Figure out some cleaner way to do this
 */
export type Schema = {
  action?: Action,
  /**
   * State relevant to the game's state itself in relation to the API, and
   * handling incoming data.
   */
  game: {
    /**
     * Are we "connected" to the API, e.g. have we received any data successfully?
     */
    status: string | GameStatus,
    /**
     * Holds a reference to the game's `webview`
     */
    webview: *,
    config: {
      muteAudio: boolean
    },
    api: {
      /**
       * Map for storing in-progress requests, using the request ID as key
       */
      requests: { [requestId: string]: * },
      /**
       * Latest
       */
      latest: ApiData,
      /**
       * Data received from the API, as key-value pairs according to game path.
       */
      data: { [path: string]: ApiData }
    },
    /**
     * Hold the processed game API data here
     */
    state: {
      /**
       * Overview about the state of the game in relation to the player
       */
      game: {
        /**
         * What are we currently doing?
         */
        mode: GameMode
      },
      lookup: {
        ships: {},
        equipment: {}
      },
      /**
       * Player profile
       */
      player: *,
      ships?: {
        base?: {},
        player?: {}
      },
      fleets?: {},
      equipment?: {
        base?: {},
        player?: {}
      },
      resources?: *,
      constructionDocks?: {},
      repairDocks?: {}
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

/**
 * @todo Look into alternatives on defining the required minimal state
 */
const schema = {
  game: {
    status: 'disconnected',
    webview: {},
    config: {
      muteAudio: true
    },
    api: {
      requests: {},
      latest: {},
      data: {}
    },
    state: {
      game: {
        mode: 'idle'
      },
      ships: {
        base: {},
        player: {}
      },
      equipment: {
        base: {},
        player: {}
      },
      player: {},
      fleets: {},
      resources: {},
      constructionDocks: {},
      repairDocks: {},
      questList: {},
      questState: {},
      baseData: {
        mapAreas: [],
        mapInfo: []
      }
    }
  },
  /** Application-specific state */
  application: {
    network: 'offline'
  },
  /** Application configuration */
  config: {
    gameUrl: 'http://www.dmm.com/netgame/social/-/gadgets/=/app_id=854854/'
  }
};

export default schema;
