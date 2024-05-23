<script setup>
import EmptyCard from '../EmptyCard.vue';
import DoorDetail from './DoorDetail.vue';
import BlindDetail from './BlindDetail.vue';
import RefrigeratorDetail from './RefrigeratorDetail.vue';
import VacuumDetail from './VacuumDetail.vue';
import AlarmDetail from './AlarmDetail.vue';

defineProps({
    device: Object,
})


//mapea el nombre del device con el componente
const devices = {
    blinds: BlindDetail,
    vacuum: VacuumDetail,
    door: DoorDetail,
    refrigerator: RefrigeratorDetail,
    alarm: AlarmDetail
};

</script>


<template>
    <EmptyCard>
        <v-card class="title-box">
            <h2>{{ device.name }}</h2>
            <h3>{{ device.room?.name }}</h3>
        </v-card>
        <component class="device" :is="devices[device.type.name]" :device="device"></component>
    </EmptyCard>
</template>

<style scoped>
.device {
    flex-grow: 1;
}

.title-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgb(var(--v-theme-primary));
    color: rgb(var(--v-theme-primary_v));
    font-size: large;
}
</style>