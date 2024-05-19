<script setup>
import EmptyCard from '../EmptyCard.vue';
import CurtainDetail from './BlindDetail.vue';
import VaccumDetail from './VacuumDetail.vue';

defineProps({
    name: String,
    room: String,
    deviceType: String,
})

//mapea el nombre del device con el componente
const devices = {
    Curtain: CurtainDetail,
    Vaccum: VaccumDetail,
};

const value = defineModel('value')
const status = defineModel('status')
const color = defineModel('color')

</script>


<template> 
    <EmptyCard v-model:status="status">
        <v-card class="title-box">
            <h2>{{ name }}</h2>
            <h3>{{ room }}</h3>
            <component class="device" :is="devices[deviceType]" :color="color" :value="value" :status="status"></component>
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