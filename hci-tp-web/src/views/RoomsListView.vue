<template>
    <CanvasComponent @emitAddButton="handleAddButtonPressed">
        <AddingNewSimpleThingView @newThingEvent="handleNewRoom" :addOptionActive="addButtonState" headlineName="Agregar Nueva Habitacion" thingNameLabel="Nombre de la habitación" thingTypeLabel="Tipo de habitación" :thingTypes="roomTypeArray"/>
        <h1 class="title">HABITACIONES</h1>
    </CanvasComponent>
</template>


<script setup>

import { ref } from 'vue';
import CanvasComponent from '@/components/CanvasComponent.vue';
import AddingNewSimpleThingView from './AddingNewSimpleThingView';

const addButtonState = ref(false);
const roomTypeArray = ['Living', 'Garage', 'Cuarto', 'Cocina', 'Baño', 'Patio'];
const handleAddButtonPressed = () => { addButtonState.value = !addButtonState.value; };
const handleNewRoom = (state, name, type) => {
  
  addButtonState.value = false;
  console.log(`Nueva habitacion: ${name} de tipo: ${type}`);
}
</script>

<style scoped>
.title {
  text-align: center;
  margin: 1rem 0;
  font-size: 2.5rem;
  color: rgb(var(--v-theme-primary));
}

</style>