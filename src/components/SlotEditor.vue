<script setup lang="ts">
import { ref } from 'vue';
import type { Inventory } from '../types/save';
import { generateSuperchargedSlot, generateValidSlot } from '../helpers/slots';
import type { CustomSlotData } from '../types/slot';

const props = defineProps<{
  activeInventoryData: Inventory<'Substance' | 'Product'> | Inventory<'Technology'> | undefined;
  selectedInventory: 'cargo' | 'tech';
  slot: CustomSlotData;
}>();

const isSlotOpen = ref(false);

const isActive = ref(props.slot.isActive);
const isSupercharged = ref(props.slot.isSupercharged);
const damageFactor = ref(props.slot.damageFactor);
const amount = ref(props.slot.amount);

function confirmChanges() {
  if (isActive.value) {
    activateSlot();
  } else {
    deactivateSlot();
  }

  if (isSupercharged.value) {
    superchargeSlot();
  } else {
    removeSupercharge();
  }

  const activeSlot = props.activeInventoryData?.Slots.find(
    (item) => item.Index.X === props.slot.X && item.Index.Y === props.slot.Y
  );
  if (activeSlot) {
    activeSlot.Amount = amount.value;
    activeSlot.DamageFactor = damageFactor.value;
  }
}

function cancelChanges() {
  isActive.value = props.slot.isActive;
  isSupercharged.value = props.slot.isSupercharged;
  amount.value = props.slot.amount;
}

function activateSlot() {
  const newSlot = generateValidSlot(props.slot.X, props.slot.Y);
  props.activeInventoryData?.ValidSlotIndices.push(newSlot);
}

function deactivateSlot() {
  if (!props.activeInventoryData) return;
  props.activeInventoryData.ValidSlotIndices = props.activeInventoryData.ValidSlotIndices.filter(
    (item) => item.X !== props.slot.X || item.Y !== props.slot.Y
  );
}

function superchargeSlot() {
  const superchargedSlot = generateSuperchargedSlot(props.slot.X, props.slot.Y);
  props.activeInventoryData?.SpecialSlots?.push(superchargedSlot);
}

function removeSupercharge() {
  if (!props.activeInventoryData?.SpecialSlots) return;
  props.activeInventoryData.SpecialSlots = props.activeInventoryData.SpecialSlots.filter(
    (item) => item.Index.X !== props.slot.X || item.Index.Y !== props.slot.Y
  );
}
</script>

<template>
  <QBtn
    :class="{ 'q-ml-auto': !slot.item }"
    color="black"
    icon="settings"
    size="sm"
    flat
    round
    @click="isSlotOpen = true"
  />

  <QDialog v-model="isSlotOpen">
    <QCard>
      <QCardSection>
        <div class="text-h6">Slot Editor</div>
      </QCardSection>

      <QCardSection class="q-pt-none column">
        <QInput
          v-if="selectedInventory === 'cargo'"
          v-model="amount"
          label="amount"
        />
        <template v-else>
          <QCheckbox
            v-model="isSupercharged"
            label="Supercharged"
          />
          <QCheckbox
            v-model="damageFactor"
            :false-value="0"
            :true-value="1"
            label="Broken"
          />
        </template>
        <QCheckbox
          v-model="isActive"
          label="Active"
        />
      </QCardSection>

      <QCardActions>
        <QBtn
          v-close-popup
          color="primary"
          label="OK"
          flat
          @click="confirmChanges"
        />
        <QBtn
          v-close-popup
          color="Secondary"
          label="Cancel"
          flat
          @click="cancelChanges"
        />
      </QCardActions>
    </QCard>
  </QDialog>
</template>
