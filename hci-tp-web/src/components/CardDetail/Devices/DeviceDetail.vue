<script setup>
import EmptyCard from '../EmptyCard.vue';
import DoorDetail from './DoorDetail.vue';
import BlindDetail from './BlindDetail.vue';
import RefrigeratorDetail from './RefrigeratorDetail.vue';
import VacuumDetail from './VacuumDetail.vue';

defineProps({
    device: Object,
})

//mapea el nombre del device con el componente
const devices = {
    blinds: BlindDetail,
    vaccum: VacuumDetail,
    door: DoorDetail,
    refrigerator: RefrigeratorDetail,
};

</script>


<template> 
    <EmptyCard>
        <v-card class="title-box">
            <h2>{{ device.name }}</h2>
            <h3>{{ device.room?.name }}</h3>
            <component class="device" :is="devices[device.type.name]"></component>
        </v-card>
    </EmptyCard>
</template>

<style scoped>
.title-box{
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #003153; 
}
.device {
    padding: 10%;
    display: flex;
    flex-direction: column;
    align-items: center; 
    height: 100%;
}
</style>