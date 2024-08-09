<script setup lang="ts">
import ThemeSwitch from './components/ThemeSwitch.vue';
import NavBar from './components/NavBar.vue';
import { useSaveDataStore } from './stores/saveData';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { toRefs } from 'vue';
import router from './router';

const saveDataStore = useSaveDataStore();
const { data } = storeToRefs(saveDataStore);

const route = useRoute();
const { name: tab } = toRefs(route);

const { routes } = router.options;
</script>

<template>
  <QLayout view="hHh LpR fff">
    <QHeader
      class="bg-primary text-white"
      elevated
    >
      <QToolbar>
        <NavBar />

        <QToolbarTitle class="text-center">
          <h1>NMS Save Web Editor</h1>
        </QToolbarTitle>

        <ThemeSwitch />
      </QToolbar>

      <QTabs align="left">
        <QRouteTab
          v-for="tab in routes"
          :disable="!data && tab.path !== '/'"
          :label="tab.meta?.label"
          :name="typeof tab.name === 'string' ? tab.name : undefined"
          :to="tab.path"
          exact
        />
      </QTabs>
    </QHeader>

    <QPageContainer>
      <QTabPanels
        v-model="tab"
        animated
      >
        <QTabPanel
          v-for="tab in routes"
          :name="tab.name"
          class="no-padding"
        >
          <QPage
            class="q-pa-xl"
            padding
          >
            <RouterView />
          </QPage>
        </QTabPanel>
      </QTabPanels>
    </QPageContainer>
  </QLayout>
</template>

<style scoped lang="scss">
h1 {
  all: unset;
}
</style>
