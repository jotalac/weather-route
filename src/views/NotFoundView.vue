<script setup lang="ts">
import HomeIcon from '@/components/icons/HomeIcon.vue';
import LostIcon from '@/components/icons/LostIcon.vue';
import { useRouter } from 'vue-router';

const router = useRouter()

function goBackHome() {
  router.push("/")
}

</script>


<template>
  <main>

    <div class="lost-cont">
      <h1>
        404
      </h1>
      <h2><LostIcon/> Are you lost?</h2>

      <button @click="goBackHome">
        <HomeIcon />
        Go back home
      </button>
    </div>

  </main>

</template>

<style scoped>
main {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lost-cont {
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  font-size: 8em;
  color: var(--primary-100);
  height: 150px;
}

h2 {
  font-size: 2em;
  color: var(--primary-100);
}

h2 svg {
  width: 30px;
  height: 30px;
}

button {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.2em;
  padding: 5px 20px;
  margin-top: 20px;
  background-color: var(--primary-1000);
  border-radius: var(--border-rad-main);
  border: none;
  color: var(--primary-250);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

button:hover {
  filter: brightness(1.1);
  transform: translateY(-5px);
}

</style>
