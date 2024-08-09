<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { Mapping as mapping } from '@/assets/mapping.json';
import { useSaveDataStore } from '../stores/saveData';
import { storeToRefs } from 'pinia';
import type { Mapping } from '@/types/mapping';
import type { SaveTopLevel } from '../types/save';
import { Notify } from 'quasar';

// We're lying to the compiler here, we don't actually check whether the function actually returns a save JSON.
// But we can assume it does, otherwise this would be very weird. Also checking for proper save structure would be a huge function and would constantly break.
declare function decompressSave(file: File, mapping: Mapping): Promise<SaveTopLevel | Error>;

const saveDataStore = useSaveDataStore();
const { data, filename, uploadFailed } = storeToRefs(saveDataStore);

const fileInput = ref<HTMLInputElement | null>(null);
const isDecompressing = ref(false);

const file = ref<File>();

watchEffect(() => {
  if (file.value) decodeSave(file.value);
});

async function decodeSave(file: File) {
  isDecompressing.value = true;
  uploadFailed.value = false;
  filename.value = file.name;
  try {
    const decompressedSave = await decompressSave(file, mapping);
    if (decompressedSave instanceof Error) throw decompressedSave;
    data.value = decompressedSave;
    isDecompressing.value = false;
    Notify.create({
      type: 'positive',
      message: 'Save loaded!',
    });
  } catch (error) {
    uploadFailed.value = true;
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
    :error="uploadFailed"
    :loading="isDecompressing"
    accept=".hg"
    error-message="Something went wrong!"
    label="Drag'n'Drop or click to Upload Save"
    ref="fileInput"
    type="file"
    outlined
  />
</template>
