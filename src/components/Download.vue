<script setup lang="ts">
import { downloadFile } from '@/helpers/download';
import { reverseMapKeys } from '@/helpers/obfuscate';
import { storeToRefs } from 'pinia';
import { useSaveDataStore } from '../stores/saveData';
import { Mapping as mapping } from '@/assets/mapping.json';

const saveDataStore = useSaveDataStore();
const { data, filename } = storeToRefs(saveDataStore);

function downloadSave() {
  if (!data.value) return;
  const obfuscatedJson = reverseMapKeys(data.value, mapping);
  const stringifiedJson = JSON.stringify(obfuscatedJson);
  downloadFile(stringifiedJson, filename.value);
}
</script>

<template>
  <QBtn @click="downloadSave">Download</QBtn>
</template>
