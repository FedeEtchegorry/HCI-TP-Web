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
    <GridComponent :items="filteredComponents">
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
import { ref, onMounted, computed, shallowRef } from 'vue';
import DeviceDetail from '@/components/CardDetail/Devices/DeviceDetail.vue';
import CanvasComponent from '@/components/CanvasComponent.vue';
import GridComponent from '@/components/GridComponent.vue';
import { useDeviceStore } from '@/stores/deviceStore';
import AddingNewSimpleThingView from './AddingNewSimpleThingView.vue';
import { useSearchStore } from '@/stores/searchStore';

const searchStore = useSearchStore();
const search = computed(() => searchStore.getSearch);
const deviceStore = useDeviceStore();
const components = shallowRef([]);
const addButtonState = ref(false);
const deviceTypeArray = ['Aspiradora', 'Persiana', 'Heladera', 'Puerta', 'Alarma'];
const deviceTypeId=['ofglvd9gqx8yfl3l','eu0v2xgprrhhg41g','rnizejqr2di0okho','lsf78ly0eqrjbz91','mxztsyjzsrq7iaqc'];

const handleAddButtonPressed = () => {
  addButtonState.value = !addButtonState.value;
};


async function addDevice(name, type){
  try{
    const newDevice = {
            type: {
              id:deviceTypeId.at(deviceTypeArray.findIndex(t => t === type))
            },
            name: name,
        };
    await deviceStore.add(newDevice);
    return true;
  }catch(e){
    console.log("Problemas");
    return false;
  }
  
}

const handleNewDevice = (state, name, type) => {
  if (addDevice(name, type)){
    addButtonState.value = false;
  }else {
    errorMsg.value="Error Al agregar el dispositivo";
  }
  console.log(`Nuevo device: ${name} de tipo: ${type}`);
};

onMounted(async () => {
  await deviceStore.getAll();
  components.value = deviceStore.devices.map(device => ({
    component: DeviceDetail,
    props: { device }
  }));
});

const filteredComponents = computed(() => {
  if (!search.value) {
    return components.value;
  }
  return components.value.filter(item =>
    item.props.device.name.toLowerCase().includes(search.value.toLowerCase())
  );
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
