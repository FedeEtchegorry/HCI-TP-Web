<template>
    <CanvasComponent @emitAddButton="handleAddButtonPressed" :blurActive="blurStatus">
        <AddingNewRoutineView @newRoutineEvent="handleNewRoutine" :addOptionActive="addButtonState" :supportedDevices="devicesAndActions"/>
        <h1 class="title">RUTINAS</h1>
        <GridComponent :items="components"><template v-slot:default="{ item }">
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
      </template></GridComponent>
    </CanvasComponent>
</template>


<script setup>

import { ref, onMounted } from 'vue';
import CanvasComponent from '@/components/CanvasComponent.vue';
import AddingNewRoutineView from './AddingNewRoutineView';
import { useRoutineStore } from '@/stores/routineStore';
import RoutinesDetail from '@/components/CardDetail/Routines/RoutinesDetail.vue'

const routineStore = useRoutineStore();
const components = ref([]);
const addButtonState = ref(false);
const blurStatus = ref(false);
const devicesAndActions = ref([ 
  {type:'Alarma', actions:['Activar', 'Desactivar']},
  {type:'Aspiradora', actions:['Iniciar', 'Pausar', 'Regresar Base de Carga']},
  {type:'Heladera', actions:['Establecer Temp. Freezer', 'Establecer Temp.']},
  {type:'Persiana', actions:['Abrir', 'Cerrar', 'Establecer Posición']},
  {type:'Puerta', actions:['Abrir', 'Cerrar', 'Bloquear', 'Desbloquear']}
]);

const handleAddButtonPressed = () => {
  addButtonState.value = !addButtonState.value;
  blurStatus.value = addButtonState.value;
};

const handleNewRoutine = (routine) => {

  if (routine != null) {
    // ...
    console.log(`Nueva rutina: ${routine.value.name}`);
  }
  else {
    addButtonState.value = false;
    blurStatus.value = false;
    console.log(`Rutina cancelada`);
  }

  // Aquí puedes agregar lógica para añadir el nuevo dispositivo al store y a components
};

onMounted(async () => {
  await routineStore.getAll();
  components.value = routineStore.routines.map(routine => ({
    component: RoutinesDetail,
    props: { routine }
  }));
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