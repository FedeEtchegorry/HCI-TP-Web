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
import { useSearchStore } from '@/stores/searchStore';
import RoutinesDetail from '@/components/CardDetail/Routines/RoutinesDetail.vue'

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

const routine = ref({
  name: '',
  actions: [{ device: deviceStore.devices.find(device => device.name === device).id, action: '', param: ''}],
});

async function storeRoutine(routine){
    try{
      if(await routineStore.add(routine))
        return true;
    }
    catch(e){
      errorMsg.value = "Error al enviar la rutina";
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