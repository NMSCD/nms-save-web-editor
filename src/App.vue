<script setup lang="ts">
import ThemeSwitch from './components/ThemeSwitch.vue';
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
    </QHeader>

    <QPageContainer>
      <QPage padding>
        <RouterView />
      </QPage>
    </QPageContainer>

    <QFooter
      class="bg-grey-8 text-white text-center"
      elevated
    >
      <PageFooter />
    </QFooter>
  </QLayout>
</template>

<style scoped lang="scss">
h1 {
  all: unset
}
</style>
