<script setup lang="ts">
import SearchHistoryBlock from '@/components/home/SearchHistoryBlock.vue';
import DeleteIcon from '@/components/icons/DeleteIcon.vue';
import HomeIcon from '@/components/icons/HomeIcon.vue';
import SearchIcon from '@/components/icons/SearchIcon.vue';
import { deleteAllSearchHistory, getSearchHistory } from '@/utils/searchHistoryFunctions';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const historyItems = ref(getSearchHistory())

function goBackHome() {
  router.push("/")
}

function deleteAllRecords() {
  if (confirm("Do you want to delete all search records?")) {
    deleteAllSearchHistory()
    historyItems.value = getSearchHistory()
  }
}


</script>


<template>
  <main class="history-main">
    <h1>
      <SearchIcon class="search-icon"/>
      Search history
    </h1>
    <h2>See your full search history. Use items from history.</h2>

    <div class="home-delete-cont">

      <button class="home-button" @click="goBackHome">
        <HomeIcon />
        Home
      </button>

      <button class="delete-button" @click="deleteAllRecords">
        <DeleteIcon />
        Delete all
      </button>

    </div>

    <div class="history-items-cont">
      <p v-if="historyItems.length === 0" class="no-items-message">No search history</p>

      <SearchHistoryBlock
        v-else
        v-for="historyItem in historyItems"
        :key="historyItem.timeStamp"
        :history-item="historyItem"
        @item-used="goBackHome"
      />
    </div>


  </main>

</template>

<style scoped>

.history-main  {
  padding: 15px 30px;
  padding-bottom: 50px;

  .search-icon {
    width: 70px;
    height: 70px;
  }

  h1 {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    font-size: var(--main-title-text) ;
    color: var(--primary-100);
    justify-self: center;
  }

  h2 {
    font-size: 2em;
    max-width: 600px;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    color: var(--gray-250);
    margin-bottom: 50px;
  }
}


.home-delete-cont {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

}

.home-delete-cont button {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: large;
  background: none;
  border: none;
  transition: all ease-in-out 0.1s;
  cursor: pointer;
  border-radius: var(--border-rad-main);
  padding: 5px 10px;
}

.home-delete-cont button:hover {
  filter: brightness(1.2);
}

.home-delete-cont button svg {
  width: 30px;
  height: 30px;
}

.home-button {
  color: var(--primary-100);
}

.home-button:hover {
  background-color: var(--primary-1000);
}

.delete-button {
  color: rgb(233, 59, 59);
}

.delete-button:hover {
  background-color: rgb(66, 12, 12);
}


.history-items-cont{
  display: flex;
  flex-wrap: wrap;
  align-items: start;
  justify-content: center;
  gap: 30px;
  max-width: 1500px;
  /* max-height: 1500px; */
  overflow: scroll;
  margin-top: 30px;
  background-color: var(--transparent-dark);
  border-radius: var(--border-rad-big);
  padding: 50px 30px;
  border: 2px var(--primary-250) solid;
}

.no-items-message {
  font-size: large;
  color: var(--primary-100);
}

@media (max-width: 750px) {
  .history-main {
    h1 {
      font-size: 2em;
      margin-bottom: 50px;
    }

    .search-icon {
      width: 30px;
      height: 30px;
    }

    h2 {
      display: none;
    }
  }
}

@media (max-width: 500px) {
  .history-main {
    padding: 10px 10px;
  }

  .history-items-cont {
    max-height: none;
  }
}
</style>
