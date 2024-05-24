<template>
    <CanvasComponent @emitAddButton="handleAddButtonPressed">
        <AddingNewSimpleThingView @newThingEvent="handleNewRoom" :addOptionActive="addButtonState" headlineName="Agregar Nueva Habitacion" thingNameLabel="Nombre de la habitación" thingTypeLabel="Tipo de habitación" :thingTypes="roomTypeArray"/>
        <h1 class="title">HABITACIONES</h1>
        <GridComponent :items="components">
      <template v-slot:default="{ item }">
        <v-col
          class="d-flex flex-column grow-1 ma-2 ml-4 mr-4 fixed-size-cell"
          cols="12"
          sm="6"
          md="4"
          lg="3"
          xl="2"
        >
          <component :is="item.component" v-bind="item.props"></component>
        </v-col>
      </template>
    </GridComponent>
    </CanvasComponent>
</template>


<script setup>

import { ref, onMounted, shallowRef } from 'vue';
import CanvasComponent from '@/components/CanvasComponent.vue';
import AddingNewSimpleThingView from './AddingNewSimpleThingView';
import { useRoomStore } from '@/stores/roomStore';
import RoomDetail from '@/components/CardDetail/Rooms/RoomDetail.vue'

const roomStore = useRoomStore();
const components = shallowRef([]);
const addButtonState = ref(false);
const roomTypeArray = ['Living', 'Garage', 'Cuarto', 'Cocina', 'Baño', 'Patio'];
const handleAddButtonPressed = () => { addButtonState.value = !addButtonState.value; };
const handleNewRoom = (state, name, type) => {
  
  addButtonState.value = false;
  console.log(`Nueva habitacion: ${name} de tipo: ${type}`);
}

onMounted(async () => {
  await roomStore.getAll();
  components.value = roomStore.rooms.map(room => ({
    component: RoomDetail,
    props: { room }
  }));
});

</script>

<style scoped>
.fixed-size-cell {
  width: 15rem;
  height: 21rem;
  overflow: hidden;
}

.title {
  text-align: center;
  margin: 1rem 0;
  font-size: 2.5rem;
  color: rgb(var(--v-theme-primary));
}

</style>