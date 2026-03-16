<script setup lang="ts">
import { useSearchStore } from '@/stores/searchStore';
import BikeIcon from '../icons/BikeIcon.vue';
import CarIcon from '../icons/CarIcon.vue';
import WalkIcon from '../icons/WalkIcon.vue';

const searchStore = useSearchStore();

</script>

<template>
  <div class="transport-buttons-cont">
    <button
      class="transport-type-button"
      :class="{selected: searchStore.transportMode === 'car'}"
      @click="searchStore.setTransportMode('car')"
    >
      <CarIcon  class="transport-type-icon"/>
    </button>

    <button
      class="transport-type-button"
      :class="{selected: searchStore.transportMode === 'walk'}"
      @click="searchStore.setTransportMode('walk')"
    >
      <WalkIcon  class="transport-type-icon"/>
    </button>

    <button
      class="transport-type-button"
      :class="{selected: searchStore.transportMode === 'bike'}"
      @click="searchStore.setTransportMode('bike')"
    >
      <BikeIcon  class="transport-type-icon"/>
    </button>

  </div>

</template>

<style scoped>
.transport-buttons-cont {
  display: flex;
}

.transport-type-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 40px;
  margin-right: 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  background-color: var(--primary-250);
}

.transport-type-button.selected{
  background-color: var(--primary-100);
}

.transport-type-button:hover{
  filter: brightness(1.1);
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.345);
}

.transport-type-icon {
  color: var(--primary-1500);
}


</style>
