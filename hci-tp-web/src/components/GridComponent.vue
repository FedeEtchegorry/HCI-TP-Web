<template>
  <v-container fluid>
    <v-row dense justify="center">
      <v-col class="d-flex flex-column grow-1 ma-2 ml-4 mr-4 fixed-size-cell" v-for="(item, index) in items"
        :key="index" cols="12" sm="6" md="4" lg="3" xl="2">
        <DeviceDetail :name="item.name" :room="item.room" :deviceType="item.deviceType"></DeviceDetail>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DeviceDetail from './CardDetail/Devices/DeviceDetail.vue';

export default {
  data() {
    return {
      items: [
        { name:"Aire Acondicionado", room:"Living", deviceType:"AirCond" },
        { name:"Lampara", room:"Living", deviceType:"Bulb" },
        { name:"Aspiradora", room:"Living", deviceType:"Vaccum" },
        { name:"Cortina", room:"Living", deviceType:"Curtain" },
        // Agrega más elementos según necesites
      ]
    };
  },
};
</script>

<style scoped>
.fixed-size-cell {
  width: 15rem;
  height: 20rem;
  overflow: hidden;
}
</style>
