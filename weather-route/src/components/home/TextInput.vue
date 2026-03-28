<script setup lang="ts">

interface Props {
  placeholder: string,
  errorMsg: string
}

const props = defineProps<Props>()

const model = defineModel<string>()

</script>

<template>
  <div class="tooltip">
    <input
      type="text"
      :placeholder="props.placeholder"
      v-model="model"
      :class="{'error': errorMsg !== ''}"
    />

    <span v-if="errorMsg != ''" class="tooltiptext">{{ errorMsg }}</span>

  </div>
</template>

<style scoped>
input {
  width: 250px;
  height: 40px;
  border-radius: 50px;
  padding: 10px;
  outline: none;
  border: 2px var(--primary-250) solid;
  font-size: var(--paragraph-text);
  background-color: var(--primary-100);
  transition: all ease-in-out 0.2s;
}

input:focus {
  filter: brightness(0.9);
  box-shadow: 1px 1px 20px rgba(0, 0, 0, 0.313);
}

input.error {
  border: 2px red solid;
}

</style>
