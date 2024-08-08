<script setup lang="ts">
import { computed, ref } from 'vue';
import { Mapping as mapping } from '@/assets/mapping.json';
import { formatTime } from '@/helpers/time';
import { useSaveDataStore } from '../stores/saveData';
import { storeToRefs } from 'pinia';
import type { Mapping } from '@/types/mapping';

declare function decompressSave(file: File, mapping: Mapping): Promise<object | Error>;

const saveDataStore = useSaveDataStore();
const { data, filename, uploadFailed } = storeToRefs(saveDataStore);

const fileInput = ref<HTMLInputElement | null>(null);
const isDecompressing = ref(false);

async function decodeSave() {
  const file = fileInput.value?.files?.[0];
  if (!file) return;
  isDecompressing.value = true;
  uploadFailed.value = false;
  filename.value = file.name;
  try {
    const decompressedSave = await decompressSave(file, mapping);
    data.value = decompressedSave;
    isDecompressing.value = false;
    console.log('success!');
  } catch (error) {
    uploadFailed.value = true;
    console.error(error);
  }
}

const playTime = computed(() => formatTime(data.value?.CommonStateData.TotalPlayTime));
</script>

<template>
  Upload your .hg save file here. Only the newest NMS version is supported.
  <input
    accept=".hg"
    ref="fileInput"
    type="file"
    @change="decodeSave"
  />
  <div :aria-busy="isDecompressing"></div>
  <div
    v-if="uploadFailed"
    class="error"
  >
    Something went wrong!
  </div>
</template>
