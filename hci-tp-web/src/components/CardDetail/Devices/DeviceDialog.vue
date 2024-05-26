<template>
  <v-btn @click="showCard = true" :prepend-icon="device.meta.logo">Device {{ device.room?.name }} </v-btn>
  <v-dialog v-model="showCard" max-width="40%" height="50%">
      <DeviceDetail :device="device" v-model="showCard"></DeviceDetail>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue';
import DeviceDetail from './DeviceDetail.vue';


const props = defineProps({
  device: Object,
});

let showCard = ref(false);

</script>