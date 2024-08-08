<script setup lang="ts">
import ThemeSwitch from './components/ThemeSwitch.vue';
import NavBar from './components/NavBar.vue';
import { useSaveDataStore } from './stores/saveData';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { toRefs } from 'vue';

const saveDataStore = useSaveDataStore();
const { data } = storeToRefs(saveDataStore);

const route = useRoute();
const { name: tab } = toRefs(route);
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

      <QTabs
        v-if="data"
        align="left"
      >
        <QRouteTab
          label="Load/Download"
          name="loader"
          to="/"
          exact
        />
        <QRouteTab
          label="Overview"
          name="stats"
          to="/stats"
          exact
        />
        <QRouteTab
          label="Language"
          name="language"
          to="/language"
          exact
        />
      </QTabs>
    </QHeader>

    <QPageContainer>
      <QPage padding>
        <QTabPanels
          v-model="tab"
          animated
        >
          <QTabPanel name="loader">
            <RouterView />
          </QTabPanel>

          <QTabPanel name="stats">
            <RouterView />
          </QTabPanel>

          <QTabPanel name="language">
            <RouterView />
          </QTabPanel>
        </QTabPanels>
      </QPage>
    </QPageContainer>
  </QLayout>
</template>

<style scoped lang="scss">
h1 {
  all: unset;
}
</style>
