<template>
    <v-btn @click="showCard = true"></v-btn>
    <v-dialog v-model="showCard">
        <DeviceDetail :device="device"></DeviceDetail>
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