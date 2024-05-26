<template>
  <v-card color="primary_v">
    <v-card @click="showCard = true" class="ma-4" outlined>
      <v-card-title><v-icon>{{ device.meta.logo }}</v-icon> {{ device.name }}</v-card-title>
      <v-card-subtitle>Habitacion: {{ device.room?.name }} </v-card-subtitle>
      <v-card-text>
        <div><strong>Consumo de Energía:</strong> {{ device.type.powerUsage }}W</div>
        <div v-if="device.state.batteryLevel"><strong>Nivel de Batería:</strong> {{ device.state.batteryLevel }}%</div>
        <div v-if="device.state.status"><strong>Estado:</strong> {{ toSpanishState(capitalizeFirstLetter(device.state.status)) }}</div>
        <div v-if="device.state.mode"><strong>Modo:</strong> {{ toSpanishMode(capitalizeFirstLetter(device.state.mode)) }}</div>
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

function toSpanishState(string){
  switch(string){
    //PUERTA Y VENTANA
    case 'Opened':
      return 'Abierto';
    case 'Closed':
      return 'Cerrado';
    case 'Opening':
      return 'Abriendo';
    case 'Closing':
      return 'Cerrando';
    //ALARMA
    case 'Disarmed':
      return 'Desactivada';
    case 'ArmedStay':
      return 'Activada-En casa'
    case 'ArmedAway':
      return 'Activada-fuera de casa';
    //ASPIRADORA
    case 'Docked':
      return 'En puerto de carga';
    case 'Inactive':
      return 'Inactiva';
    case 'Active':
      return 'Activa';
    case 'Pause':
      return 'Pausa';
  }
}

function toSpanishMode(string){
  switch(string){
    case 'Mop':
      return 'Trapeando';
    case 'Vacuum':
      return 'Aspirando';
    case 'Party':
      return 'Fiesta';
    case 'Vacation':
      return 'Vacaciones'
    case 'Default':
      return 'Default';
  }

}

let showCard = ref(false);

</script>

<style scoped></style>