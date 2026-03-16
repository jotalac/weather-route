<script setup lang="ts">
import { useSearchStore } from '@/stores/searchStore';
import { computed } from 'vue';

const searchStore = useSearchStore()

const maxSearchDays = 16

// min time is now, max time is 16 days from now
const formatDateTime = (date: Date) => {
  // Use local time instead of UTC to avoid timezone shifting
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

// Calculate `min` (now)
const minDateTime = computed(() => {
  return formatDateTime(new Date());
});

// Calculate `max` (exactly 5 days from now)
const maxDateTime = computed(() => {
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + maxSearchDays);
  return formatDateTime(maxDate);
});

</script>

<template>
  <input
    type="datetime-local"
    :value="searchStore.departureTime"
    :min="minDateTime"
    :max="maxDateTime"
    class="datetime-input"
    @input="searchStore.setDepartureTime(($event.target as HTMLInputElement).value)"
  />
</template>

<style scoped>
.datetime-input {
  height: 30px;
  border-radius: 50px;
  padding: 0px 10px;
  outline: none;
  /* border: 2px var(--green-250) solid; */
  border: none;
  background-color: var(--green-250);
  color: var(--green-1500);
  cursor: pointer;
  transition: all ease-in-out 0.2s;
}

.datetime-input:focus {
  filter: brightness(0.9);
  box-shadow: 1px 1px 20px rgba(0, 0, 0, 0.313);
}

/* Optional: customize the native calendar icon slightly */
::-webkit-calendar-picker-indicator {
  cursor: pointer;
  opacity: 0.6;
  transition: 0.2s;
}

::-webkit-calendar-picker-indicator:hover {
  opacity: 1;
}
</style>
