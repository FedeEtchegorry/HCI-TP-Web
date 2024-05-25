<template>
  <RouterView />

</template>

<script setup>
import DevicesListView from './views/DevicesListView.vue'

import RoomsListView from './views/RoomsListView.vue'

import { useDeviceStore } from '@/stores/deviceStore';
import { RouterLink, RouterView } from 'vue-router'
import SearchComponent from './components/SearchComponent.vue'
import DeviceDetail from './components/CardDetail/Devices/DeviceDetail.vue'
import { onMounted } from 'vue';
import { useRoomStore } from './stores/roomStore';
const deviceStore = useDeviceStore();
const roomStore = useRoomStore();

onMounted(async () => {
  await deviceStore.getAll();
  await roomStore.getAll();
});


</script>
