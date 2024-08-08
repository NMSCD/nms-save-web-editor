<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();

const nmscdHosts = ['saveeditor.nmscd.com', 'editor.nmscd.com', 'save.nmscd.com'];
const isNmscdHost = nmscdHosts.includes(window.location.host);
</script>

<template>
  <QItem :href="isNmscdHost ? 'https://nmscd.com' : '/'">
    <QItemSection>
      <QIcon name="arrow_back" />
    </QItemSection>
    <QItemSection avatar>View other pages</QItemSection>
  </QItem>
</template>
