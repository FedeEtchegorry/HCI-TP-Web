<template>
  <v-card color="primary_v">
    <v-card @click="showCard = true" class="ma-4" outlined>
      <v-card-title><v-icon>{{ device.meta.logo }}</v-icon> {{ device.name }}</v-card-title>
      <v-card-subtitle>Location: {{ device.room.name }} </v-card-subtitle>
      <v-card-text>
        <div><strong>Consumo de Energía:</strong> {{ device.type.powerUsage }}W</div>
        <div v-if="device.state.batteryLevel"><strong>Nivel de Batería:</strong> {{ device.state.batteryLevel }}%</div>
        <div v-if="device.state.status"><strong>Estado:</strong> {{ capitalizeFirstLetter(device.state.status) }}</div>
        <div v-if="device.state.mode"><strong>Modo:</strong> {{ capitalizeFirstLetter(device.state.mode) }}</div>
      </v-card-text>
    </v-card>


    <v-dialog v-model="showCard" max-width="40%" height="50%">
      <DeviceDetail :device="device" v-model="showCard"></DeviceDetail>
    </v-dialog>
  </v-card>

</template>

<script setup>
import { ref } from 'vue';
import DeviceDetail from './DeviceDetail.vue';


const props = defineProps({
  device: Object,
});

function capitalizeFirstLetter(string) {
  if (!string) 
    return string; 
  return string.charAt(0).toUpperCase() + string.slice(1);
}

let showCard = ref(false);

</script>

<style scoped></style>