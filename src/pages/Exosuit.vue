<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useSaveDataStore } from '../stores/saveData';
import { computed, reactive, ref, watch, watchEffect } from 'vue';
import { QSelect } from 'quasar';
import type { SpecialSlot } from '../types/save';

const saveDataStore = useSaveDataStore();
const { data } = storeToRefs(saveDataStore);

const inventoryData = computed(() => data.value?.BaseContext.PlayerStateData.Inventory);
const techInventoryData = computed(() => data.value?.BaseContext.PlayerStateData.Inventory_TechOnly);

const selectedInventory = ref<'tech' | 'cargo'>('cargo');

// setting default to 1 so we don't divide by 0 and end up with infinity
const maxXCargo = computed(() => inventoryData.value?.Width ?? 1);
const maxYCargo = computed(() => inventoryData.value?.Height ?? 1);
const maxXTech = computed(() => techInventoryData.value?.Width ?? 1);
const maxYTech = computed(() => techInventoryData.value?.Height ?? 1);

const inventoryMapping = reactive({
  cargo: {
    data: inventoryData,
    width: maxXCargo,
    height: maxYCargo,
  },
  tech: {
    data: techInventoryData,
    width: maxXTech,
    height: maxYTech,
  },
});

const activeInventoryData = computed(() => inventoryMapping[selectedInventory.value].data);

const inventoryOptions = [
  {
    label: 'Cargo',
    value: 'cargo',
  },
  {
    label: 'Technology',
    value: 'tech',
  },
];

// create array with 120 items that have X/Y values according to the exosuit coordinates. They are all inactive for now.
function generateTemplateArray(context: 'tech' | 'cargo' = selectedInventory.value) {
  const { width, height } = inventoryMapping[context];
  return Array.from({ length: width * height }, (_element, index) => index).map((item) => ({
    X: Math.round((item / width - Math.floor(item / width)) * width),
    Y: Math.floor(item / width),
    isActive: false,
    item: '',
    amount: 0,
    isSupercharged: false,
  }));
}

watch(selectedInventory, () => (allSlots.value = generateTemplateArray()));

const allSlots = ref(generateTemplateArray());

// unlocked slots
watchEffect(() => {
  activeInventoryData.value?.ValidSlotIndices.forEach((item) => {
    const slotInArray = allSlots.value.find((slot) => slot.X === item.X && slot.Y === item.Y);
    if (!slotInArray) return;
    slotInArray.isActive = true;
  });
});

// filled slots
watchEffect(() => {
  activeInventoryData.value?.Slots.forEach((item) => {
    const slotInArray = allSlots.value.find((slot) => slot.X === item.Index.X && slot.Y === item.Index.Y);
    if (!slotInArray) return;
    slotInArray.item = item.Id.slice(1);
    slotInArray.amount = item.Amount;
  });
});

// supercharged slots
watchEffect(() => {
  activeInventoryData.value?.SpecialSlots?.filter((item) => item.Type.InventorySpecialSlotType === 'TechBonus').forEach(
    (item) => {
      const slotInArray = allSlots.value.find((slot) => slot.X === item.Index.X && slot.Y === item.Index.Y);
      if (!slotInArray) return;
      slotInArray.isSupercharged = true;
    }
  );
});

const generateSuperchargedSlot = (X: number, Y: number): SpecialSlot => ({
  Type: {
    InventorySpecialSlotType: 'TechBonus',
  },
  Index: {
    X,
    Y,
  },
});

const generateValidSlot = (X: number, Y: number) => ({ X, Y });

const unlockAllSlots = () => {
  if (!activeInventoryData.value) return;
  activeInventoryData.value.ValidSlotIndices = allSlots.value.map(({ X, Y }) => generateValidSlot(X, Y));
};

const superchargeAllSlots = () => {
  if (!techInventoryData.value?.SpecialSlots) return;
  techInventoryData.value.SpecialSlots = generateTemplateArray('tech').map(({ X, Y }) =>
    generateSuperchargedSlot(X, Y)
  );
};
</script>

<template>
  <div class="row q-mb-md justify-between">
    <div class="row items-baseline q-gutter-x-sm">
      <div>Select Inventory:</div>
      <QSelect
        v-model="selectedInventory"
        :options="inventoryOptions"
        emit-value
        map-options
        filled
        outline
      />
    </div>
    <div class="row justify-end q-gutter-x-md">
      <QBtn
        label="Unlock All"
        unelevated
        outline
        @click="unlockAllSlots"
      />
      <QBtn
        :disabled="selectedInventory === 'cargo'"
        label="Supercharge All"
        unelevated
        outline
        @click="superchargeAllSlots"
      />
    </div>
  </div>
  <div class="grid non-selectable">
    <div
      v-for="slot in allSlots"
      :class="{ active: slot.isActive, super: slot.isSupercharged }"
      class="slot q-pa-xs"
    >
      <span class="row justify-between items-center">
        <span
          v-if="slot.item"
          class="slot-content"
          >{{ slot.item }} x{{ slot.amount }}</span
        ><QBtn
          :class="{ 'q-ml-auto': !slot.item }"
          color="black"
          icon="settings"
          size="sm"
          flat
          round
        />
      </span>
    </div>
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

    &.super {
      border: 2px solid yellow;
    }

    .slot-content {
      color: black;
    }
  }
}
</style>
