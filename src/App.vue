<script setup lang="ts">
import { ref } from 'vue';
import { Mapping } from './assets/mapping.json';

const fileInput = ref<HTMLInputElement | null>(null);
const saveData = ref(null);
const isDecompressing = ref(false);

async function decodeSave() {
  const file = fileInput.value?.files?.[0];
  if (!file) return;
  isDecompressing.value = true;
  const decompressedSave = await decompressSave(file, Mapping);
  saveData.value = decompressedSave;
  isDecompressing.value = false;
  console.log('success!');
  downloadFile(JSON.stringify(decompressedSave, null, 2), `${file.name}.json`);
}

// chatGPT's version of the file downloader
function downloadFile(data, fileName) {
  const blob = new File([data], fileName, { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
}
</script>

<template>
  <input
    accept=".hg"
    ref="fileInput"
    type="file"
  />
  <button
    :disabled="isDecompressing"
    @click="decodeSave"
  >
    Decompress
  </button>
</template>
