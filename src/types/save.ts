export interface SaveTopLevel {
  Version: number;
  Platform: string;
  ActiveContext: 'Main' | 'Expedition';
  CommonStateData: CommonStateData;
  BaseContext: StateData;
  ExpeditionContext?: StateData;
  DiscoveryManagerData: DiscoveryManagerData;
}

interface StateData {
  GameMode: number;
  PlayerStateData: PlayerStateData;
  SpawnStateData: SpawnStateData;
}

interface CommonStateData {
  SaveName: string;
  TotalPlayTime: number;
}

interface DiscoveryManagerData {
  ReserveStore: number;
  ReserveManaged: number;
  Store: {
    Record: object[];
  };
  Available: object[];
  Enqueued: object[];
}

interface SpawnStateData {
  LastKnownPlayerState:
    | 'OnFoot'
    | 'InShip'
    | 'InStation'
    | 'AboardFleet'
    | 'InNexus'
    | 'AbandonedFreighter'
    | 'InShipLanded';
}

interface PlayerStateData {
  UniverseAddress: object;
  SaveSummary: string;
  DifficultyState: DifficultyState;
  TimeStamp: number;
  Health: number;
  ShipHealth: number;
  Shield: number;
  ShipShield: number;
  Energy: number;
  Units: number;
  Nanites: number;
  Specials: number;
  TimeAlive: number;
  Stats: object[];
}

interface DifficultyPresetType {
  DifficultyPresetType: 'Custom' | 'Normal' | 'Creative' | 'Relaxed' | 'Survival' | 'Permadeath';
}

interface DifficultyState {
  Preset: DifficultyPresetType;
  EasiestUsedPreset: DifficultyPresetType;
  HardestUsedPreset: DifficultyPresetType;
  Settings: { SettingsLocked: boolean };
}
