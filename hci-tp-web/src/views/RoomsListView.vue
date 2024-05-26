<template>
    <CanvasComponent @emitAddButton="handleAddButtonPressed" :blurActive="blurStatus">
        <AddingNewSimpleThingView @newThingEvent="handleNewRoom" v-model:toggle="addButtonState" headlineName="Agregar Nueva Habitacion" thingNameLabel="Nombre de la habitación" thingTypeLabel="Tipo de habitación" :thingTypes="Object.keys(roomType)"/>
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
        <RouterLink class="router-custom" to="/" @click="handleClick(item)">
            <component :is="item.component" v-bind="item.props"></component>
        </RouterLink>
        </v-col>
      </template>
    </GridComponent>
    </CanvasComponent>
</template>


<script setup>
import { useSearchStore } from '@/stores/searchStore';
import { ref, onMounted } from 'vue';
import CanvasComponent from '@/components/CanvasComponent.vue';
import AddingNewSimpleThingView from './AddingNewSimpleThingView.vue';
import { useRoomStore } from '@/stores/roomStore';
import RoomDetail from '@/components/CardDetail/Rooms/RoomDetail.vue'
import { Room, RoomMeta } from '@/api/room';

const roomStore = useRoomStore();
const components = ref([]);
let addButtonState = ref(false);
const blurStatus = ref(false);

const searchStore = useSearchStore();

const roomType = {
  'Living': 'mdi-sofa',
  'Garage': 'mdi-garage',
  'Cuarto': 'mdi-bed',
  'Cocina': 'mdi-countertop',
  'Baño': 'mdi-toilet',
  'Patio': 'mdi-sprout',
}

const handleAddButtonPressed = () => {
  addButtonState.value = !addButtonState.value;
  blurStatus.value = addButtonState.value;
};

async function handleNewRoom(state, name, type){
  addButtonState.value = false;
  blurStatus.value = false;
  if(!state)
    return;
  try {
    const roomMeta = new RoomMeta(roomType[type])
    const room = new Room(null, name, roomMeta);
    await roomStore.add(room);
    window.location.reload();
  }catch(e){
    console.log('Error creating room: ', e);
  }
}

const handleClick = (item) => {
  searchStore.updateSearch(item.props.room.name);
  searchStore.updateSelected('Por habitacion');
};


onMounted(async () => {
  await roomStore.getAll();
  components.value = roomStore.rooms.map(room => ({
    component: RoomDetail,
    props: { room }
  }));
});

</script>

<style scoped>
.router-custom{
  text-decoration: none;
}

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