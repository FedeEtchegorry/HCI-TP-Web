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
            <component :is="item.component" v-bind="item.props"></component>
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
import AddingNewRoutineView from './AddingNewRoutineView';
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
const addButtonState = ref(false);
const blurStatus = ref(false);
const devicesAndActions = ref([
  { type: 'Alarma', actions: ['Activar', 'Desactivar'] },
  { type: 'Aspiradora', actions: ['Iniciar', 'Pausar', 'Regresar Base de Carga'] },
  { type: 'Heladera', actions: ['Establecer Temp. Freezer', 'Establecer Temp.'] },
  { type: 'Persiana', actions: ['Abrir', 'Cerrar', 'Establecer Posición'] },
  { type: 'Puerta', actions: ['Abrir', 'Cerrar', 'Bloquear', 'Desbloquear'] }
]);

function getDeviceTypeAndActions(deviceType){
  switch(deviceType){
    case 'alarm':
      return {type: 'Alarma', actions: ['Activar', 'Desactivar'] };
    case 'blinds':
      return {type: 'Persiana', actions: ['Abrir', 'Cerrar', 'Establecer Posición'] };
    case 'vacuum':
      return{type: 'Aspiradora', actions: ['Iniciar', 'Pausar', 'Regresar Base de Carga']};
    case 'door':
      return {type: 'Puerta', actions: ['Abrir', 'Cerrar', 'Bloquear', 'Desbloquear'] };
    case 'refrigerator':
      return {type: 'Heladera', actions: ['Establecer Temp. Freezer', 'Establecer Temp.', 'Modo fiesta', 'Modo default', 'Modo vacaciones']};
    default:
      return null;
  }
}

const myDevices = ref([

  { name: 'Dispositivo_1', type: 'Alarma', actions: ['Activar', 'Desactivar'] }

]);

const showMyRoutine = ref(true);
const selectedRoutine = ref({

  name: 'mi_rutina',
  devices: [
    { name: 'Dispo_1', action: 'Apagar', param: 'n/a' },
    { name: 'Dispo_2', action: 'Prender', param: 'n/a' },
    { name: 'Dispo_3', action: 'Apagar', param: 'n/a' },
    { name: 'Dispo_4', action: 'Prender', param: 'n/a' },
    { name: 'Dispo_5', action: 'Apagar', param: 'n/a' },
    { name: 'Dispo_6', action: 'Prender', param: 'n/a' }
  ]
});

const errorMsg = ref('');
const errorMessageOn = computed(() => errorMsg.value != '');

const handleAddButtonPressed = () => {
  addButtonState.value = !addButtonState.value;
  blurStatus.value = addButtonState.value;
};

const handleShowRoutineEvent = () => {

  showMyRoutine.value = !showMyRoutine.value;
};

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
    storeRoutine(routine);
  }
};




async function storeRoutine(routineArray) {
    const routine = new Routine(name, null);
    routineArray.forEach(row => {
        const device = deviceStore.devices.find(device => device.name === row.device.value);
        if (device) {
            routine.addAction(new Action(device.id, row.action, row.param));
        } else {
            throw new Error(`Device ${row.device.value} not found`);
        }
    });
    try {
        const result = await routineStore.add(routine);
        if (result) {
            return true;
        } else {
            throw new Error('Failed to add routine');
        }
    } catch (e) {
        errorMsg.value = `Error al enviar la rutina: ${e.message}`;
        return false;
    }
}



onMounted(async () => {
  await routineStore.getAll();
  components.value = routineStore.routines.map(routine => ({
    component: RoutinesDetail,
    props: { routine }
  }));
  searchStore.setItems([
    'Por nombre de rutina',
  ]);
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