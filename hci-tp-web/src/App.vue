<template>
  <v-app>
    <DevicesListView />
  </v-app>
</template>

<script setup>
import DevicesListView from './views/DevicesListView.vue'
import { useDeviceStore } from '@/stores/deviceStore';
const deviceStore = useDeviceStore();
</script>

<style scoped></style>
