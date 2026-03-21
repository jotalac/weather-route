<script setup lang="ts">
import { computed } from 'vue';
import { useSearchStore } from '@/stores/searchStore';
import type { SearchPrecision } from '@/types';

const searchStore = useSearchStore();

const precisionLevels: SearchPrecision[] = ['min', 'low', 'medium', 'high', 'max'];

const currentPrecisionIndex = computed({
  get: () => precisionLevels.indexOf(searchStore.searchPrecision),
  set: (val: number) => {
    searchStore.searchPrecision = precisionLevels[val];
  }
});

const setPrecision = (index: number) => {
  currentPrecisionIndex.value = index;
};
</script>

<template>
  <div class="precision-slider-cont tooltip">
    <p class="slider-title">Weather route precision</p>

    <div class="slider-wrapper">
      <!-- Labels above the slider -->
      <div class="slider-labels">
        <span
          v-for="(label, index) in precisionLevels"
          :key="label"
          :class="{ active: currentPrecisionIndex === index }"
          @click="setPrecision(index)"
        >
          {{ label }}
        </span>
      </div>

      <!-- The actual range input -->
      <input
        type="range"
        min="0"
        max="4"
        step="1"
        v-model="currentPrecisionIndex"
        class="custom-range"
      />
    </div>
  </div>
</template>

<style scoped>
.precision-slider-cont {
  width: 100%;
  max-width: 400px;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  display: flex;
}

.slider-title {
  color: var(--primary-100);
  margin-bottom: 5px;
  text-align: center;
}

.slider-wrapper {
  position: relative;
  margin-top: 10px;
}

.slider-labels {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  padding: 0 5px;
}

.slider-labels span {
  font-size: var(--font-size-main);
  color: var(--primary-150);
  cursor: pointer;
  transition: color 0.2s ease;
  text-transform: capitalize;
  text-align: center;
  flex: 1;
}

.slider-labels span.active {
  color: var(--primary-100);
  font-weight: bold;
}

/* Customizing the Range Input */
.custom-range {
  -webkit-appearance: none;
  width: 100%;
  height: 8px;
  background: var(--primary-750);
  border-radius: 5px;
  outline: none;
  cursor: pointer;
}

.custom-range::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--primary-250);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border: none;
}

.custom-range::-webkit-slider-thumb:hover {
  background: var(--primary-100);
  transform: scale(1.1);
  box-shadow: 0 0 10px rgba(182, 229, 234, 0.5);
}

.custom-range::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--primary-250);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.custom-range::-moz-range-thumb:hover {
  background: var(--primary-100);
  transform: scale(1.1);
}
</style>
