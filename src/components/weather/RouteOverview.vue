<script setup lang="ts">
import type { TransportMode } from '@/types';
import { formatTime, transportIconsMapper } from '@/utils/util';
import ClockIcon from '../icons/ClockIcon.vue';
import DistanceIcon from '../icons/DistanceIcon.vue';

const props = defineProps<{
  transportMode: TransportMode,
  distance: number,
  duration: number
}>()

function getFormattedDistance(): string {
  return (props.distance / 1000).toFixed(2)
}

</script>

<template>
   <div class="route-overview-cont">
        <component :is="transportIconsMapper(transportMode)" class="transport-icon"/>

        <span class="overview-item">
          <DistanceIcon />{{ getFormattedDistance() }}km
        </span>

        <span class="overview-item">
          <ClockIcon/>{{ formatTime(duration) }}
        </span>

    </div>
</template>

<style scoped>
.route-overview-cont {
  /* max-width: 500px; */
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  gap: 50px;
  background-color: var(--transparent-dark);
  padding: 10px;
  border-radius: var(--border-rad-main);
  color: var(--primary-100);
  font-size: 1.3em;
}

.transport-icon {
  color: var(--primary-100);
  width: 35px;
  height: 35px;
}


.overview-item {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.overview-item svg {
  color: var(--primary-250);
}

@media (max-width: 500px) {
  .route-overview-cont {
    font-size: 1em;
    gap: 20px;
  }

  .transport-icon {
    width: 30px;
    height: 30px;
  }
}

@media (max-width: 350px) {
  .route-overview-cont {
    gap: 10px;
  }

  .transport-icon {
    width: 20px;
    height: 20px;
  }
}

</style>
