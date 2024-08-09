<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { Mapping as mapping } from '@/assets/mapping.json';
import { useSaveDataStore } from '../stores/saveData';
import { storeToRefs } from 'pinia';
import type { SaveTopLevel } from '../types/save';
import { Notify } from 'quasar';
import { decompressSave } from '../helpers/decoder';

const saveDataStore = useSaveDataStore();
const { data, filename } = storeToRefs(saveDataStore);

const fileInput = ref<HTMLInputElement | null>(null);
const isDecompressing = ref(false);

const file = ref<File>();

watchEffect(() => {
  if (file.value) decodeSave(file.value);
});

async function decodeSave(file: File) {
  isDecompressing.value = true;
  filename.value = file.name;
  try {
    // We're lying to the compiler here, we don't actually check whether the function actually returns a save JSON.
    // But we can assume it does, otherwise this would be very weird. Also checking for proper save structure would be a huge function and would constantly break.
    const decompressedSave = (await decompressSave(file, mapping)) as SaveTopLevel;
    if (decompressedSave instanceof Error) throw decompressedSave;
    data.value = decompressedSave;
    isDecompressing.value = false;
    Notify.create({
      type: 'positive',
      message: 'Save loaded!',
    });
  } catch (error) {
    console.error(error);
    Notify.create({
      type: 'negative',
      message: 'Something went wrong!',
    });
  }
}
</script>

<template>
  <p>Upload your .hg save file here. Only the newest NMS version is supported.</p>
  <QFile
    v-model="file"
    :loading="isDecompressing"
    accept=".hg"
    label="Drag'n'Drop or click to Upload Save"
    ref="fileInput"
    type="file"
    outlined
  />
</template>
