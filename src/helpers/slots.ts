import type { SpecialSlot } from '../types/save';

export const generateSuperchargedSlot = (X: number, Y: number): SpecialSlot => ({
  Type: {
    InventorySpecialSlotType: 'TechBonus',
  },
  Index: {
    X,
    Y,
  },
});

export const generateValidSlot = (X: number, Y: number) => ({ X, Y });
