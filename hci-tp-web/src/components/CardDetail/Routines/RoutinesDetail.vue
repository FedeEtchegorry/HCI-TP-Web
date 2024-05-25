<template>
    <EmptyCard class="custom-empty-card" @click="">
        <v-card class=custom-card>
            <div class="custom-title">
                <h1>{{ routine.name }}</h1>
            </div>
            <v-icon class="custom-icon" :icon="routine.meta.icon"></v-icon>
            <div class="custom-qty-devices">
                <h2>DEVICES</h2>
            </div>
            <div >
                <h2>{{ qtyDevicesByRoutine }}</h2>
            </div>
        </v-card>
    </EmptyCard>
</template>

<script setup>
import { useRoutineStore } from '@/stores/routineStore';
import { ref, onMounted } from 'vue';

const props = defineProps({
    routine: Object,
})

const routineStore = useRoutineStore();

const myRoutine = ref(props.routine);
let qtyDevicesByRoutine = ref(0);

onMounted(async () => {
   const result = await routineStore.get(myRoutine.value.id);
   qtyDevicesByRoutine.value = result.actions.length;
});




</script>


<style scoped>
.custom-empty-card {
    background-color: rgb(var(--v-theme-primary_v));
}

.custom-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgb(var(--v-theme-primary_v));
    border: none;
    box-shadow: none;
    user-select: none;
}

.custom-title {
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    padding: 1rem;
}

.custom-icon {
    font-size: 4rem;
    margin-top: 2.5rem;
}

.custom-qty-devices {
    padding-top: 3rem;
}

.custom-qty {

}

h2 {
    margin: 0;
    padding: 0;
}
</style>
