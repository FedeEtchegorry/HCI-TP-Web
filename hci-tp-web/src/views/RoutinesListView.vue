<template>
  <CanvasComponent @emitAddButton="handleAddButtonPressed" :blurActive="blurStatus">
    <AddingNewRoutineView @newRoutineEvent="handleNewRoutine" :addOptionActive="addButtonState" :myDevices="myDevices"
      :errorMessageOn="errorMessageOn" :errorMsg="errorMsg" />
      <ShowRoutineView @showRoutineEvent="handleShowRoutineEvent" :showRoutine="showMyRoutine" :myRoutine="selectedRoutine"/>
    <h1 class="title">RUTINAS</h1>
    <v-container fluid>
      <v-row dense justify="center">
        <template v-for="(item, index) in filteredRoutines" :key="index">
          <v-col class="d-flex flex-column grow-1 ma-2 ml-4 mr-4 fixed-size-cell" cols="12" sm="6" md="4" lg="3" xl="2">
            <component :is="item.component" v-bind="item.props" @clickForDetails="clickRoutine"></component>
          </v-col>
        </template>
        <h2 v-show="components.length==0">AGREGA TU PRIMERA RUTINA</h2>
      </v-row>
    </v-container>
  </CanvasComponent>
</template>

<script setup>

import { ref, computed, onMounted } from 'vue';
import CanvasComponent from '@/components/CanvasComponent.vue';
import AddingNewRoutineView from './AddingNewRoutineView.vue';
import ShowRoutineView from './ShowRoutineView';
import { useRoutineStore } from '@/stores/routineStore';
import { useDeviceStore } from '@/stores/deviceStore';
import { useSearchStore } from '@/stores/searchStore';
import RoutinesDetail from '@/components/CardDetail/Routines/RoutinesDetail.vue'
import { Action, Routine } from '@/api/routines';

const deviceStore = useDeviceStore();
const searchStore = useSearchStore();
const search = computed(() => searchStore.getSearch);
const routineStore = useRoutineStore();
const components = ref([]);
const myDevices = ref([]);
const addButtonState = ref(false);
const blurStatus = ref(false);

const showMyRoutine = ref(false);
const selectedRoutine = ref({});

const clickRoutine = (id) => {
  selectedRoutine.value = routineStore.routines.find(routine => routine.id === id);
  showMyRoutine.value = !showMyRoutine.value;
};

const errorMsg = ref('');
const errorMessageOn = computed(() => errorMsg.value != '');

const handleAddButtonPressed = () => {
  addButtonState.value = !addButtonState.value;
  blurStatus.value = addButtonState.value;
};

const handleShowRoutineEvent = () => {

  showMyRoutine.value = !showMyRoutine.value;
};

function getAction(actionName){
  switch(actionName){
    case 'Activar Casa':
      return 'armStay';
    case 'Activar Fuera':
      return 'armAway';
    case 'Desactivar':
      return 'disarm';
    case 'Abrir':
      return 'open';
    case 'Cerrar':
      return 'close';
    case 'Establecer Posición':
      return 'setLevel';
    case 'Iniciar':
      return 'start';
    case 'Pausar':
      return 'stop';
    case 'Regresar Base de Carga':
      return 'dock';
    case 'Modo trapear':
      return 'setMode';
    case 'Modo aspirar':
      return 'setMode';
    case 'Bloquear':
      return 'lock';
    case 'Desbloquear':
      return 'unlock';
    case 'Establecer Temp. Freezer':
      return 'setTempFreezer';
    case 'Establecer Temp.':
      return 'setTemp';
    case 'Modo fiesta':
      return 'setMode';
    case 'Modo default':
      return 'setMode';
    case 'Modo vacaciones':
      return 'setMode';
    default:
      return null;
  }
}

const handleNewRoutine = (routine) => {

  if (routine === null || routine.value === null) {
    addButtonState.value = false;
    blurStatus.value = false;
    errorMsg.value = '';
  }
  else if (!routine.value.name || routine.value.name === '' || routine.value.devices.length === 0) {
    errorMsg.value = "Campos incompletos";
  }
  else {
    errorMsg.value = '';
    storeRoutine(routine.value);
  }
};


function createRoutine(routineData){
  const routine = new Routine(routineData.name, null);
  for (const deviceEntry of routineData.devices){
    if (deviceEntry.device!=''){
      if (deviceEntry.param==''){
        deviceEntry.param=null
      }
      if (deviceEntry.action=='Modo fiesta'){
        deviceEntry.param='party';
      }
      if (deviceEntry.action=='Modo vacaciones'){
        deviceEntry.param='vacation';
      }
      if (deviceEntry.action=='Modo default'){
        deviceEntry.param='default';
      }
      if (deviceEntry.action=='Modo trapear'){
        deviceEntry.param='mop';
      }
      if (deviceEntry.action=='Modo aspirar'){
        deviceEntry.param='vacuum';
      }
      const action = new Action((deviceStore.devices.find(device => device.name == deviceEntry.device)).id, getAction(deviceEntry.action), new Array(deviceEntry.param), null);
      console.log(action);
      routine.addAction(action);
      } else {
          throw new Error(`Device ${deviceEntry.device} not found`);
    }
}
console.log(`${routine}`);
return routine
}

async function storeRoutine(routine) {
        await routineStore.add(createRoutine(routine));
        addButtonState.value = false;
        blurStatus.value = false;
}
    
    

onMounted(async () => {
  await deviceStore.getAll();
  await routineStore.getAll();
  components.value = routineStore.routines.map(routine => ({
    component: RoutinesDetail,
    props: { routine }
  }));
  searchStore.setItems([
    'Por nombre de rutina',
  ]);

  myDevices.value = deviceStore.devices.map(device => { return { name: device.name, type: device.type.name}; });
  console.log(`${myDevices}`)
});

const filteredRoutines = computed(() => {
  if (!search.value) {
    return components.value;
  }
  return components.value.filter(item =>
    item.props.routine.name.toLowerCase().includes(search.value.toLowerCase())
  );
});
</script>

<style scoped>
.title {
  text-align: center;
  margin: 1rem 0;
  font-size: 2.5rem;
  color: rgb(var(--v-theme-primary));
}
</style>