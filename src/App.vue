<script setup lang="ts">
import ThemeSwitch from './components/ThemeSwitch.vue';
import NavBar from './components/NavBar.vue';
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
          to="/"
          label="Load/Download"
          exact
        />
        <QRouteTab
          to="/stats"
          label="Overview"
          exact
        />
        <QRouteTab
          to="/language"
          label="Language"
          exact
        />
      </QTabs>
    </QHeader>

    <QPageContainer>
      <QPage padding>
        <RouterView />
      </QPage>
    </QPageContainer>
  </QLayout>
</template>

<style scoped lang="scss">
h1 {
  all: unset;
}
</style>
