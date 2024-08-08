import { defineStore } from 'pinia';

// Define state object structure
interface SaveData {
  data: object | null;
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
  actions: {},
});
