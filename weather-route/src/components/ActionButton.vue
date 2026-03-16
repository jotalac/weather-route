<script setup lang="ts">
import type { ButtonType } from '@/types';
import CheckSymbol from './icons/CheckSymbol.vue';
import XIcon from './icons/XIcon.vue';
import ResetIcon from './icons/ResetIcon.vue';


interface Props {
  buttonType: ButtonType
  buttonText: string
}

interface Emits {
  buttonClick: []
}

const props = defineProps<Props>()

const emit = defineEmits<Emits>()

const buttonIcons = {
  submit: CheckSymbol,
  cancel: XIcon,
  reset: ResetIcon
}

</script>

<template>

  <button
    :class="props.buttonType"
    @click="emit('buttonClick')"
  >
    <span class="text-button">{{buttonText}}</span>
    <component :is="buttonIcons[buttonType]" class="icon-button"/>
  </button>

</template>

<style scoped>
button{
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 15px;
  border-radius: var(--border-rad-main);
  border: none;
  cursor: pointer;
  transition: all ease-in-out 0.1s;
}

button:hover{
  filter: brightness(1.2);
  box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.495);
}

button.submit{
  background-color: var(--primary-100);
  color: var(--primary-1500);
}

button.reset{
  background-color: var(--primary-1500);
  color: var(--primary-100);
}
</style>
