<template>
  <CanvasComponent @emitAddButton="handleAddButtonPressed">
    <AddingNewSimpleThingView
      @newThingEvent="handleNewDevice"
      :addOptionActive="addButtonState"
      headlineName="Agregar Nuevo Dispositivo"
      thingNameLabel="Nombre del dispositivo"
      thingTypeLabel="Tipo de dispositivo"
      :thingTypes="deviceTypeArray"
    />
    <h1 class="title">DISPOSITIVOS</h1>
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
import DeviceDetail from '@/components/CardDetail/Devices/DeviceDetail.vue';
import CanvasComponent from '@/components/CanvasComponent.vue';
import GridComponent from '@/components/GridComponent.vue';
import { useDeviceStore } from '@/stores/deviceStore';
import AddingNewSimpleThingView from './AddingNewSimpleThingView.vue';

const deviceStore = useDeviceStore();
const components = shallowRef([]);
const addButtonState = ref(false);
const deviceTypeArray = ['Aspiradora', 'Persiana', 'Heladera', 'Puerta', 'Alarma'];

const handleAddButtonPressed = () => {
  addButtonState.value = !addButtonState.value;
};

const handleNewDevice = (state, name, type) => {
  addButtonState.value = false;
  console.log(`Nuevo device: ${name} de tipo: ${type}`);
};

onMounted(async () => {
  await deviceStore.getAll();
  components.value = deviceStore.devices.map(device => ({
    component: DeviceDetail,
    props: { device }
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
