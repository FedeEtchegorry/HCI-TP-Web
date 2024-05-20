<template>
  <v-container fluid>
    <v-row dense justify="center">
      <v-col class="d-flex flex-column grow-1 ma-2 ml-4 mr-4 fixed-size-cell"
        v-for="(device, index) in deviceStore.devices" :key="index" cols="12" sm="6" md="4" lg="3" xl="2">
        <DeviceDetail :device="device"></DeviceDetail>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { onBeforeMount } from 'vue';
import DeviceDetail from './CardDetail/Devices/DeviceDetail.vue';
import { useDeviceStore } from '@/stores/deviceStore';
import { Refrigerator } from '@/api/device';

const deviceStore = useDeviceStore();


onBeforeMount(async () => { //PREGUNTAR SI ESTA BIEN EL HOOK O ES BEFOREMOUNT
  await deviceStore.getAll();
})

</script>

<style scoped>
.fixed-size-cell {
  width: 15rem;
  height: 20rem;
  overflow: hidden;
}
</style>
