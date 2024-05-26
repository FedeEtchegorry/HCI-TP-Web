<template>
  <EmptyCard class="">
    <v-card @click="showCard = true" class="ma-1 card-2" outlined>
      <v-card-title class="title">
        <h2>{{ device.name }}</h2>
      </v-card-title>
      <v-icon class="icon">{{ device.meta.logo }}</v-icon>

      <v-card-subtitle class="subtitle">
        <h3>Habitacion: {{ device.room ? device.room.name : 'Sin asignar' }}</h3>
      </v-card-subtitle>
      <v-card-text class="info">
        <div>
          <h3>Uso de energía: {{ device.type.powerUsage }}W</h3>
        </div>
        <div v-if="device.state.batteryLevel"><h3>Nivel de Batería: {{ device.state.batteryLevel }}%</h3></div>
        <div v-if="device.state.status"><h3>Estado: {{ toSpanishState(capitalizeFirstLetter(device.state.status)) }}</h3></div>
        <div v-if="device.state.mode"><h3>Modo: {{ toSpanishMode(capitalizeFirstLetter(device.state.mode)) }}</h3></div>
      </v-card-text>
    </v-card>
    <v-dialog v-model="showCard" max-width="40%" height="50%">
      <DeviceDetail :device="device" v-model="showCard"></DeviceDetail>
    </v-dialog>
  </EmptyCard>
</template>

<script setup>
import { ref } from 'vue';
import DeviceDetail from './DeviceDetail.vue';
import EmptyCard from '../EmptyCard.vue';


const props = defineProps({
  device: Object,
});

function capitalizeFirstLetter(string) {
  if (!string)
    return string;
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function toSpanishState(string) {
  switch (string) {
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
      return 'Puerto de carga';
    case 'Inactive':
      return 'Inactiva';
    case 'Active':
      return 'Activa';
    case 'Pause':
      return 'Pausa';
  }
}

function toSpanishMode(string) {
  switch (string) {
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

<style scoped>
.card-2 {
  border-radius: 3%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(var(--v-theme-primary_v));
  border: none;
  box-shadow: none;
  user-select: none;
}

.icon {
  font-size: 4rem;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;

}

.title {
  color: rgb(var(--v-theme-primary));
  text-transform: uppercase;
}

.subtitle {
  font-size: large;
  color: rgb(var(--v-theme-primary));
  opacity: 0.9;
  margin: 0;
}

.info {
  padding-top: 0.5rem;
  flex-grow: 1;
}
</style>