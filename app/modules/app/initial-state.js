/**
 * @fileoverview
 *  Describes the initial/default schema of the state store.
 *
 * @flow
 */
import * as L from 'partial.lenses';

type GameStatus = 'disconnected' | 'connected';
type NetworkState = 'offline' | 'online';

type ApiData = {
  path?: string,
  time: number,
  body: *,
  postBody: *
};

type Effect = { type: string, payload?: *, error?: * };
type GameModeEnum = 'disconnected' | 'idle' | 'in_sortie' | 'in_practice' | 'ship_critical';
type GameMode = GameModeEnum | Array<GameModeEnum>;

type LMap<A> = { [id: string]: A };

type MapData = {
  areas: *,
  info: *,
  music: *
};

type Quests = { [id: string]: * };
type QuestView = *;

type EquipmentEntity = *;
type ShipEntity = *;

type RepairDock = *;
type ConstructionDock = *;
type Resource = *;
type Mission = *;
type Player = { [key: string]: * };

type Equipment = {
  base?: LMap<EquipmentEntity>,
  player?: LMap<EquipmentEntity>
};

type Ships = {
  base?: LMap<ShipEntity>,
  player?: LMap<ShipEntity>
};

/**
 * @todo Figure out some cleaner way to do this
 */
export type Schema = {
  effect?: Effect,
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
    webview: {
      /**
       * ClientRect for the webview where it's located in the view
       * Used for taking screenshots
       */
      rect?: [number, number]
    },
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
       * What are we currently doing?
       */
      status: GameMode,
      lookup: {
        ships: LMap<number>,
        equipment: LMap<number>
      },
      /**
       * Player profile
       */
      player: Player,
      furniture?: {
        base?: LMap<*>,
        player?: LMap<*>
      },
      ships?: Ships,
      fleets?: LMap<*>,
      equipment?: Equipment,
      resources?: LMap<Resource>,
      constructionDocks?: LMap<ConstructionDock>,
      repairDocks?: LMap<RepairDock>,
      quests: Quests,
      maps: MapData,
      missions: LMap<Mission>,
      views?: {
        quests?: QuestView
      }
    }
  },
  application: {
    networkStatus: string | NetworkState,
    titleText?: string,
    paths?: { [path: string]: string }
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
    webview: {
      rect: null
    },
    config: {
      muteAudio: true
    },
    api: {
      requests: {},
      latest: {},
      data: {}
    },
    state: {
      status: 'disconnected',
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
      quests: {},
      maps: {
        areas: {},
        info: {},
        music: {}
      },
      views: {
        quests: {}
      }
    }
  },
  /** Application-specific state */
  application: {
    network: 'offline',
    paths: {}
  },
  /** Application configuration */
  config: {
    gameUrl: 'http://www.dmm.com/netgame/social/-/gadgets/=/app_id=854854/'
  }
};

// const stateL = {
//   Game: {}
// };

// const schemaL = L.pick({
//   game: L.pick(stateL.Game)
// });

export default schema;
