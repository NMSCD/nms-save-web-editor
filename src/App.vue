<script setup lang="ts">
import { computed, ref } from 'vue';
import { Mapping } from './assets/mapping.json';
import { formatTime } from './helpers/time';
import { downloadFile } from './helpers/download';
import { reverseMapKeys } from './helpers/obfuscate';

const fileInput = ref<HTMLInputElement | null>(null);
const saveData = ref<object>();
const isDecompressing = ref(false);
const filename = ref('');

async function decodeSave() {
  const file = fileInput.value?.files?.[0];
  if (!file) return;
  isDecompressing.value = true;
  filename.value = file.name;
  const decompressedSave = await decompressSave(file, Mapping);
  if (typeof decompressedSave === 'string') return;
  saveData.value = decompressedSave;
  isDecompressing.value = false;
  console.log('success!');
}

const playTime = computed(() => formatTime(saveData.value?.CommonStateData.TotalPlayTime));

function downloadSave() {
  if (!saveData.value) return;
  const obfuscatedJson = reverseMapKeys(saveData.value, Mapping);
  const stringifiedJson = JSON.stringify(obfuscatedJson);
  downloadFile(stringifiedJson, filename.value);
}
</script>

<template>
  <input
    accept=".hg"
    ref="fileInput"
    type="file"
    @change="decodeSave"
  />
  <div :aria-busy="isDecompressing"></div>

  <!-- <pre>{{ saveData }}</pre> -->

  <template v-if="saveData">
    <div>
      <span>Playtime:</span> <span>{{ playTime }}</span>
    </div>

    <button @click="downloadSave">Download</button>
  </template>
</template>
