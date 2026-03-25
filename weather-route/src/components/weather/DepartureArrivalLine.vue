<script setup lang="ts">
import CalendarIcon from '../icons/CalendarIcon.vue';


const props = defineProps<{
  startDateTime: string
  durationSeconds: number
}>()

const startTimeFormatted = props.startDateTime === '' ? new Date.toISOString(). : props.startDateTime
const endTimeFormatted = props.durationSeconds


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


</style>
