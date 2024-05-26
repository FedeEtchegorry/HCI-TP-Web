<template>
  <CanvasComponent @emitAddButton="handleAddButtonPressed" :blurActive="blurStatus">
    <AddingNewSimpleThingView @newThingEvent="handleNewDevice" v-model:toggle="addButtonState"
      :errorMessageOn="errorMessageOn" :errorMsg="errorMsg" headlineName="Agregar Nuevo Dispositivo"
      thingNameLabel="Nombre del dispositivo" thingTypeLabel="Tipo de dispositivo" :thingTypes="Object.keys(deviceType)"
      :extraThingParameter="roomsForDevice" />
    <h1 class="title">DISPOSITIVOS</h1>

    <v-container fluid>
      <v-row dense justify="center">
        <template v-for="(item, index) in filteredComponents" :key="index">
          <v-col class="d-flex flex-column grow-1 ma-2 ml-4 mr-4 fixed-size-cell" cols="12" sm="6" md="4" lg="3" xl="2">
            <component :is="item.component" v-bind="item.props"></component>
          </v-col>
        </template>
      </v-row>
    </v-container>
  </CanvasComponent>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import CanvasComponent from '@/components/CanvasComponent.vue';
import AddingNewSimpleThingView from './AddingNewSimpleThingView.vue';
import DeviceDialog from '@/components/CardDetail/Devices/DeviceDialog.vue';
import { useDeviceStore } from '@/stores/deviceStore';
import { useSearchStore } from '@/stores/searchStore';
import { useRoomStore } from '@/stores/roomStore';
import { Vacuum, Blind, Refrigerator, Door, Alarm } from '@/api/device';

const deviceStore = useDeviceStore();
const roomStore = useRoomStore();
const searchStore = useSearchStore();

const components = ref([]);
let addButtonState = ref(false);
const blurStatus = ref(false);
const errorMsg = ref('');
const errorMessageOn = computed(() => errorMsg.value != '');
const filterSelected = computed(() => searchStore.getSelected);
const search = computed(() => searchStore.getSearch);
let roomsForDevice;

const deviceType = {
  'Alarma': Alarm,
  'Aspiradora': Vacuum,
  'Heladera': Refrigerator,
  'Persiana': Blind,
  'Puerta': Door,
};

const handleAddButtonPressed = () => {
  errorMsg.value = '';
  addButtonState.value = !addButtonState.value;
  blurStatus.value = addButtonState.value;
};

async function addDevice(name, type) {
  try {
    let newDevice = new deviceType[type](name);
    newDevice = await deviceStore.add(newDevice);
    components.value.push({
      component: DeviceDialog,
      props: { device: newDevice }
    });
    return newDevice;
  } catch (e) {
    console.log("Error creating devices: ", e);
    return null;
  }
}

async function handleNewDevice(state, name, type, roomName) {
  if (!state) {
    addButtonState.value = false;
    blurStatus.value = false;
    errorMsg.value = '';
  } else if (!name || !type) {
    errorMsg.value = "Campos incompletos";
  } else {
    const newDevice = await addDevice(name, type);

    if (newDevice) {
      addButtonState.value = false;
      blurStatus.value = false;
      await roomStore.addDeviceToRoom(
        roomStore.rooms.find(room => room.name === roomName).id,
        newDevice.id
      );
      errorMsg.value = '';
    } else {
      errorMsg.value = "Error al agregar el dispositivo";
    }
  }
}

onMounted(async () => {
  await deviceStore.getAll();
  await roomStore.getAll();
  roomsForDevice = {
    label: 'Vincular a habitación',
    options: roomStore.rooms.map(room => room.name),
  };
  components.value = deviceStore.devices.map(device => ({
    component: DeviceDialog,
    props: { device }
  }));
  searchStore.setItems([
    'Por nombre de dispositivo',
    'Por habitacion',
    'Por tipo de dispositivo'
  ]);
});

function filterByDeviceName(devices) {
  if (!search.value) return devices;
  return devices.filter(item =>
    item.props.device.name.toLowerCase().includes(search.value.toLowerCase())
  );
}

function filterByRoom(devices) {
  if (!search.value) return devices;
  return devices.filter(item =>
    item.props.device.room?.name.toLowerCase().includes(search.value.toLowerCase())
  );
}

function filterByDeviceType(devices) {
  if (!search.value) return devices;
  return devices.filter(item =>
    item.props.device.type.name.toLowerCase().includes(search.value.toLowerCase())
  );
}

const filteredComponents = computed(() => {
  let filtered = components.value;
  switch (filterSelected.value) {
    case 'Por habitacion':
      filtered = filterByRoom(filtered);
      break;
    case 'Por tipo de dispositivo':
      filtered = filterByDeviceType(filtered);
      break;
    default:
      filtered = filterByDeviceName(filtered);
      break;
  }
  return filtered;
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
