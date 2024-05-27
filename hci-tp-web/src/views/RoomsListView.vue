<template>
  <CanvasComponent @emitAddButton="handleAddButtonPressed" :blurActive="blurStatus">
    <AddingNewSimpleThingView @newThingEvent="handleNewRoom" v-model:toggle="addButtonState"
      :errorMessageOn="errorMessageOn" :errorMsg="errorMsg" headlineName="Agregar Nueva Habitacion"
      thingNameLabel="Nombre de la habitación" thingTypeLabel="Tipo de habitación"
      :thingTypes="Object.keys(roomType)" />
    <h1 class="title">HABITACIONES</h1>
    <v-container fluid>
    <v-row dense justify="center">
      <template v-for="(item, index) in filteredRooms" :key="index">
        <v-col class="d-flex flex-column grow-1 ma-2 ml-4 mr-4 fixed-size-cell" cols="12" sm="6" md="4" lg="3" xl="2">
          <RouterLink class="router-custom" to="/" @click="handleClick(item)">
            <component v-if="item" :is="item.component" v-bind="item.props"></component>
          </RouterLink>
        </v-col>
      </template>
      <h2 v-show="components.length==0">AGREGA TU PRIMER HABITACIÓN</h2>
    </v-row>
    
  </v-container>

  </CanvasComponent>
</template>


<script setup>
import { useSearchStore } from '@/stores/searchStore';
import { ref, computed, onMounted, shallowRef } from 'vue';
import CanvasComponent from '@/components/CanvasComponent.vue';
import AddingNewSimpleThingView from './AddingNewSimpleThingView.vue';
import { useRoomStore } from '@/stores/roomStore';
import RoomDetail from '@/components/CardDetail/Rooms/RoomDetail.vue'
import { Room, RoomMeta } from '@/api/room';

const roomStore = useRoomStore();
const components = shallowRef([]);
let addButtonState = ref(false);
const blurStatus = ref(false);
const searchStore = useSearchStore();
const search = computed(() => searchStore.getSearch);
const errorMsg = ref('');
const errorMessageOn = computed(() => errorMsg.value != '');

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

async function handleNewRoom(state, name, type) {
  if (!state) {
    addButtonState.value = false;
    blurStatus.value = false;
    errorMsg.value = '';
  }
  else if (!name || name === '' || !type || type === '') {
    errorMsg.value = "Campos incompletos";
  }
  else {

    try {
      const roomMeta = new RoomMeta(roomType[type])
      const room = new Room(null, name, roomMeta);
      await roomStore.add(room);
      errorMsg.value = '';
      components.value.push({ component: RoomDetail, props: { room }});
      addButtonState.value = false;
      blurStatus.value = false;
    } catch (e) {
      errorMsg.value = "Error al agregar la habitación";
    }
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
  searchStore.setItems([
    'Por nombre de habitacion',
  ]);
});

const filteredRooms = computed(() => {
  if (!search.value) {
    return components.value;
  }
  return components.value.filter(item =>
    item.props.room.name.toLowerCase().includes(search.value.toLowerCase())
  );
});
</script>

<style scoped>
.router-custom {
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