<script setup lang="ts">
import { computed } from 'vue';
import { formatTime } from '@/helpers/time';
import { useSaveDataStore } from '../stores/saveData';
import { storeToRefs } from 'pinia';

const saveDataStore = useSaveDataStore();
const { data } = storeToRefs(saveDataStore);

const saveName = computed(() => data.value?.CommonStateData.SaveName);
const saveSummary = computed(() => data.value?.BaseContext.PlayerStateData.SaveSummary);
const timeStamp = computed(() => new Date(data.value?.BaseContext.PlayerStateData.TimeStamp * 1000).toLocaleString());

const playTime = computed(() => formatTime(data.value?.CommonStateData.TotalPlayTime));

const units = computed(() => data.value?.BaseContext.PlayerStateData.Units.toLocaleString());
const nanites = computed(() => data.value?.BaseContext.PlayerStateData.Nanites.toLocaleString());
const quicksilver = computed(() => data.value?.BaseContext.PlayerStateData.Specials.toLocaleString());

const currentDifficulty = computed(
  () => data.value?.BaseContext.PlayerStateData.DifficultyState.Preset.DifficultyPresetType
);
</script>

<template>
  <div class="column q-gutter-y-md">
    <div>
      <div class="text-weight-bold">Description</div>
      <div>
        <span>Name:</span> <span>{{ saveName }}</span>
      </div>
      <div>
        <span>Description:</span> <span>{{ saveSummary }}</span>
      </div>
      <div>
        <span>Last Saved:</span> <span>{{ timeStamp }}</span>
      </div>
      <div>
        <span>Difficulty:</span> <span>{{ currentDifficulty }}</span>
      </div>
    </div>

    <div>
      <span>Playtime:</span> <span>{{ playTime }}</span>
    </div>

    <div>
      <div class="text-weight-bold">Currencies</div>
      <div>
        <span>Units:</span> <span>{{ units }}</span>
      </div>
      <div>
        <span>Nanites:</span> <span>{{ nanites }}</span>
      </div>
      <div>
        <span>Quicksilver:</span> <span>{{ quicksilver }}</span>
      </div>
    </div>
  </div>
</template>
