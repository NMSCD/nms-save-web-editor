<script setup lang="ts">
import { computed } from 'vue';
import { formatTime } from '@/helpers/time';
import { useSaveDataStore } from '../stores/saveData';
import { storeToRefs } from 'pinia';

const saveDataStore = useSaveDataStore();
const { data } = storeToRefs(saveDataStore);

const playTime = computed(() => formatTime(data.value?.CommonStateData.TotalPlayTime));
</script>

<template>
  <div>Playtime:</div>
  <div>{{ playTime }}</div>
</template>
