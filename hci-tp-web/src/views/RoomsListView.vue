<template>

    <CanvasComponent @emitAddButton="handleAddButtonPressed">
        <AddingNewSimpleThingView @newThingEvent="handleNewRoom" :addOptionActive="addButtonState" headlineName="Agregar Nueva Habitacion" thingNameLabel="Nombre de la habitación" thingTypeLabel="Tipo de habitación" :thingTypes="roomTypeArray"/>
        <p>Rooms view</p>
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