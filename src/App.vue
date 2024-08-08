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
          :label="tab.meta.label"
          :name="tab.name"
          :to="tab.path"
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
          <QTabPanel
            v-for="tab in routes"
            :name="tab.name"
          >
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
