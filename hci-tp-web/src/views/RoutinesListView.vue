<template>
    <CanvasComponent @emitAddButton="handleAddButtonPressed">
        <AddingNewRoutineView @newRoutineEvent="handleNewRoutine" :addOptionActive="addButtonState"/>
        <h1 class="title">RUTINAS</h1>
    </CanvasComponent>
</template>


<script setup>

import { ref } from 'vue';
import CanvasComponent from '@/components/CanvasComponent.vue';
import AddingNewRoutineView from './AddingNewRoutineView';

const addButtonState = ref(false);

const handleAddButtonPressed = () => {
  addButtonState.value = !addButtonState.value;
};

const handleNewRoutine = (state, name, type) => {
  addButtonState.value = false;
  console.log(`Nuevo device: ${name} de tipo?: ${type}`);
  // Aquí puedes agregar lógica para añadir el nuevo dispositivo al store y a components
};

</script>

<style scoped>
.title {
  text-align: center;
  margin: 1rem 0;
  font-size: 2.5rem;
  color: rgb(var(--v-theme-primary));
}
</style>