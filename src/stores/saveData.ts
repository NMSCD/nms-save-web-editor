import { defineStore } from 'pinia';
import type { SaveTopLevel } from '../types/save';

// Define state object structure
interface SaveData {
  data: SaveTopLevel | null;
  filename: string;
  uploadFailed: boolean;
}

export const useSaveDataStore = defineStore('saveData', {
  state: (): SaveData => ({
    data: null,
    filename: '',
    uploadFailed: false,
  }),

  // derive values from state (similar to computed properties)
  getters: {},

  // mutate state
  actions: {
    setCurrentTimeStamp() {
      this.data.BaseContext.PlayerStateData.TimeStamp = Math.floor(Date.now() / 1000);
    },
  },
});
