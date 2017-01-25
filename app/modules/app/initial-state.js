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

type GameModeEnum = 'idle' | 'in_sortie' | 'in_practice' | 'ship_critical';

type GameMode = GameModeEnum | Array<GameModeEnum>;

export type Schema = {
  action?: {
    type: string,
    payload?: *,
    error?: *
  },
  game: {
    status: string | GameStatus,
    gameWebviewRect?: *,
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
      game: {
        mode: string
      },
      player: *,
      ships?: *,
      fleets?: *,
      equipment?: *,
      resources?: *,
      constructionDocks?: *,
      repairDocks?: *
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
   * State relevant to the game's state itself in relation to the API, and
   * handling incoming data.
   */
  game: {
    /**
     * Are we "connected" to the API, e.g. have we received any data successfully?
     */
    status: 'disconnected',
    gameWebviewRect: undefined,
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
      /**
       * Overview about the state of the game in relation to the player
       */
      game: {
        /**
         * Game mode active
         */
        mode: 'idle'
      },
      player: {
        name: null,
        level: -1
      },
      ships: [],
      fleets: [],
      equipment: [],
      resources: [],
      constructionDocks: [],
      repairDocks: []
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
