<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useSaveDataStore } from '../stores/saveData';
import { computed, ref, watchEffect } from 'vue';

const saveDataStore = useSaveDataStore();
const { data } = storeToRefs(saveDataStore);

const inventoryData = computed(() => data.value?.BaseContext.PlayerStateData.Inventory);

const maxX = 10;
const maxY = 12;

// create array with 120 items that have X/Y values according to the exosuit coordinates. They are all inactive for now.
const allSlots = ref(
  Array.from({ length: maxX * maxY }, (_element, index) => index).map((item) => ({
    X: Math.round((item / maxX - Math.floor(item / maxX)) * maxX),
    Y: Math.floor(item / maxX),
    isActive: false,
  }))
);

console.log(allSlots);

watchEffect(() => {
  inventoryData.value?.ValidSlotIndices.forEach((item) => {
    console.log('hi');
    const slotInArray = allSlots.value.find((slot) => slot.X === item.X && slot.Y === item.Y);
    if (slotInArray) slotInArray.isActive = true;
    if (!slotInArray) console.log('not found', item);
  });
});
</script>

<template>
  <div class="grid">
    <div
      v-for="slot in allSlots"
      :class="{ active: slot.isActive }"
      class="slot"
    ></div>
  </div>
</template>

<style scoped lang="scss">
.grid {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 0.5rem;

  .slot {
    aspect-ratio: 1;
    background-color: dimgrey;

    &.active {
      background-color: lightgrey;
    }
  }
}
</style>
