<script setup lang="ts">
import JsonEditorVue from 'json-editor-vue';
import 'vanilla-jsoneditor/themes/jse-theme-dark.css';
import { useSaveDataStore } from '../stores/saveData';
import { storeToRefs } from 'pinia';
import { Dark, Notify, QFile } from 'quasar';
import { computed, onMounted, ref, watchEffect } from 'vue';
import { downloadFile } from '../helpers/download';

const saveDataStore = useSaveDataStore();
const { data, filename } = storeToRefs(saveDataStore);

const isDark = computed(() => Dark.isActive);

const editor = ref<typeof JsonEditorVue>();
const filePicker = ref<typeof QFile>();

const isPageShown = ref(false);
const file = ref<File>();

watchEffect(() => {
  if (file.value) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const result = reader.result;
        if (typeof result !== 'string') {
          Notify.create({
            type: 'negative',
            message: 'Something went wrong!',
          });
          return;
        }

        const parsedResultJson = JSON.parse(result);
        data.value = parsedResultJson;
        Notify.create({
          type: 'positive',
          message: 'Import successful!',
        });
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: 'Invalid JSON!',
        });
        console.error(error);
      } finally {
        filePicker.value?.removeFile(file.value);
        filePicker.value?.blur();
      }
    };
    reader.readAsText(file.value);
  }
});

onMounted(() => {
  const delay = 500;
  setTimeout(() => {
    isPageShown.value = true;
  }, delay);
});

const getCurrentEditorJson = () => editor.value?.jsonEditor.get();

const exportJson = () => {
  const { json: editorJson } = getCurrentEditorJson();
  const formattedJson = JSON.stringify(editorJson, null, 2);
  const filenameWithoutExtension = filename.value.split('.').slice(0, -1).join('.');
  downloadFile(formattedJson, `${filenameWithoutExtension}.json`);
};

const saveJson = () => {
  const { json: editorJson } = getCurrentEditorJson();
  data.value = editorJson;
};
</script>

<template>
  <template v-if="isPageShown">
    <p>Warning: You can mess up your save here. Make sure you have a backup of your save!</p>
    <div class="row justify-between q-mb-sm">
      <QBtn
        color="primary"
        unelevated
        @click="saveJson"
        >Save Edits</QBtn
      >
      <div class="row q-gutter-x-md justify-end">
        <QFile
          v-model="file"
          accept=".json"
          class="col-4"
          label="Import JSON"
          ref="filePicker"
          outlined
        />
        <QBtn
          outline
          unelevated
          @click="exportJson"
          >Export JSON</QBtn
        >
      </div>
    </div>
    <JsonEditorVue
      v-model="data"
      :class="{ 'jse-theme-dark': isDark }"
      class="fit json-editor"
      ref="editor"
    />
  </template>

  <QInnerLoading
    :showing="!isPageShown"
    label="Loading JSON..."
  />
</template>

<style scoped lang="scss">
.json-editor {
  overflow-y: scroll;
  max-height: calc(100vh - 300px);
}
</style>
