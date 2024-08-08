<script setup lang="ts">
import { computed } from 'vue';
import { formatTime } from '@/helpers/time';
import { useSaveDataStore } from '../stores/saveData';
import { storeToRefs } from 'pinia';

const saveDataStore = useSaveDataStore();
const { data } = storeToRefs(saveDataStore);

const playTime = computed(() => formatTime(data.value?.CommonStateData.TotalPlayTime));
const saveName = computed(() => data.value?.CommonStateData.SaveName);
</script>

<template>
  <div>
    <span>Name:</span> <span>{{ saveName }}</span>
  </div>

  <div>
    <span>Playtime:</span> <span>{{ playTime }}</span>
  </div>
</template>
