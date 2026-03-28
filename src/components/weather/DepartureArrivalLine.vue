<script setup lang="ts">
import CalendarIcon from '../icons/CalendarIcon.vue';
import { computed } from 'vue';

const props = defineProps<{
  startDateTime: string
  durationSeconds: number
}>()

const dateFormatOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
};

const startDate = computed(() => {
  return props.startDateTime ? new Date(props.startDateTime) : new Date();
});

const startTimeFormatted = computed(() => {
  return startDate.value.toLocaleString(undefined, dateFormatOptions);
});

const endTimeFormatted = computed(() => {
  const endDate = new Date(startDate.value.getTime() + props.durationSeconds * 1000);
  return endDate.toLocaleString(undefined, dateFormatOptions);
});


</script>

<template>
  <div class="departure-arrival-cont">
    <span class="line-item">
      <CalendarIcon />
      <span class="item-title">Departure:</span>
      {{ startTimeFormatted }}
    </span>

    <span class="line-item">
      <CalendarIcon />
      <span class="item-title">Arrival:</span>
      {{ endTimeFormatted  }}
    </span>

  </div>
</template>

<style scoped>
.departure-arrival-cont {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 50px;
  width: 100%;
  background-color: var(--transparent-dark);
  border-radius: var(--border-rad-main);
  padding: 10px;
}

.line-item {
  display: flex;
  gap: 10px;
  align-items: center;
  color: var(--primary-100);
}

.line-item svg {
  width: 30px;
  height: 30px;
  color: var(--primary-250);
}

.item-title {
  font-weight: bold;
}

@media (max-width: 800px) {
  .departure-arrival-cont {
    flex-direction: column;
    gap: 20px;
    align-items: start;
  }
}


</style>
