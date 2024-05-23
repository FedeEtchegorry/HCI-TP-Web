<template>
  <CanvasComponent>
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
import { ref, onMounted, shallowRef} from 'vue';
import DeviceDetail from '@/components/CardDetail/Devices/DeviceDetail.vue';
import CanvasComponent from '@/components/CanvasComponent.vue';
import GridComponent from '@/components/GridComponent.vue';
import { useDeviceStore } from '@/stores/deviceStore';

const deviceStore = useDeviceStore();
const components = shallowRef([]);

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
  height: 20rem;
  overflow: hidden;
}
</style>
