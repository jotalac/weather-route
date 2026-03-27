<script setup lang="ts">
import type { SearchHistoryItem } from '@/types';
import ActionButton from '../ActionButton.vue';
import FlagIcon from '../icons/FlagIcon.vue';
import LocationIcon from '../icons/LocationIcon.vue';
import { transportIconsMapper } from '@/utils/util';
import { useSearchStore } from '@/stores/searchStore';
import { toast } from 'vue3-toastify';

interface Props {
  historyItem: SearchHistoryItem
}

const props = defineProps<Props>()

const searchStore = useSearchStore()

const emit = defineEmits<{
  itemUsed: []
}>()

function useHistoryItem() {
  searchStore.startLocation = props.historyItem.start.name
  searchStore.startCoords = {lat: props.historyItem.start.lat, lon: props.historyItem.start.lon}

  searchStore.endLocation = props.historyItem.end.name
  searchStore.endCoords = {lat: props.historyItem.end.lat, lon: props.historyItem.end.lon}

  searchStore.transportMode = props.historyItem.transportMode

  toast.info("Form values updated", {autoClose: 500})

  emit("itemUsed")
}


const getRelativeTime = (dateStr: string) => {
  if (!dateStr) return 'unknown';

  const standardDateStr = dateStr.replace('_', 'T');
  const past = new Date(standardDateStr).getTime();
  const now = Date.now();

  // difference in seconds
  const elapsedSeconds = Math.floor((now - past) / 1000);

  // if the date is in the future or exactly now
  if (elapsedSeconds <= 0) return 'just now';

  // time intervals in seconds
  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 }
  ];

  // loop through intervals to find the largest fitting unit
  for (const interval of intervals) {
    const count = Math.floor(elapsedSeconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
    }
  }

  return 'just now';
};

const displayTime = getRelativeTime(props.historyItem.timeStamp);

</script>

<template>
  <div class="search-history-item">
    <div class="start-destination-cont">

      <div class="location-icon-cont">
        <LocationIcon/>
        <p class="location-text">{{ historyItem.start.name }}</p>
      </div>

      <div class="location-icon-cont">
        <FlagIcon/>
        <p class="location-text">{{ historyItem.end.name }}</p>
      </div>

    </div>

    <div class="transport-date-cont">
      <component :is="transportIconsMapper(historyItem.transportMode)" class="dynamic-transport-icon"/>
      <p>{{ displayTime }}</p>
    </div>

    <ActionButton button-text="USE" class="use-button" @click="useHistoryItem"/>

  </div>
</template>


<style scoped>
.search-history-item {
  width: 300px;
  flex-shrink: 0;
  border-radius: var(--border-rad-main);
  background-color: rgba(1, 9, 23, 0.612);
  padding: 20px 15px;
  transition: all 0.2s ease-in-out;
}

.search-history-item:hover {
  box-shadow: 5px 5px 30px rgba(0, 0, 0, 0.249);
  filter: brightness(1.2);
}

.start-destination-cont {
  display: flex;
  flex-direction: column;
}

.location-icon-cont{
  display: flex;
  margin-bottom: 10px;
}

.location-text{
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.location-icon-cont p {
  color: var(--primary-100);
}

.location-icon-cont svg {
  margin-right: 10px;
  color: var(--primary-250);
  flex-shrink: 0;
}


.transport-date-cont{
  display: flex;
  gap: 10px;
}

.transport-date-cont p {
  color: var(--gray-500);
}

.transport-date-cont svg {
  color: var(--primary-100);
}

.use-button {
  margin-top: 20px;
}

</style>
