<script setup lang="ts">

const props = defineProps<{
  buttonText: string,
}>()

</script>


<template>
  <button>{{ props.buttonText }}</button>

</template>

<style scoped>
button {
  padding: 5px 10px;
  background-color: transparent;
  border: 1px solid var(--primary-500);
  color: var(--primary-250);
  border-radius: var(--border-rad-main);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

button:hover {
  filter: brightness(1.2);
  background-color: var(--primary-750);
}
</style>
