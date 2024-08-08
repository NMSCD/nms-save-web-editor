<script setup lang="ts">
import { storeToRefs } from 'pinia';
import Decoder from './components/Decoder.vue';
import Download from './components/Download.vue';
import { useSaveDataStore } from './stores/saveData';

const saveDataStore = useSaveDataStore();
const { data } = storeToRefs(saveDataStore);
</script>

<template>
  <Decoder />
  <template v-if="data">
    <div>
      <span>Playtime:</span> <span>{{ data }}</span>
    </div>
  </template>
  <Download />
</template>
