<template>
    <EmptyCard class="custom-empty-card" @click="showDetails">
        <v-card class=custom-card>
            <div class="custom-title">
                <h1>{{ routine.name }}</h1>
            </div>
            <!--<v-icon class="custom-icon" :icon="routine.meta.icon"></v-icon>-->
            <v-btn class="btn" :disabled="isDisabled" @click="startRoutine" size="110">COMENZAR</v-btn>
            <p v-show="errorMessageOn">{{ errorMsg }}</p>
                <div class="custom-qty-devices">
                    <h2>ACCIONES</h2>
                </div>
                <div >
                    <h2 class="qty">{{ qtyActionsByRoutine }}</h2>
                </div>
            
            
        </v-card>
    </EmptyCard>
</template>

<script setup>

import { useRoutineStore } from '@/stores/routineStore';
import { ref, onMounted, computed } from 'vue';

const emit = defineEmits(['clickForDetails']);
const showDetails = () => emit('clickForDetails', myRoutine.value.id);

const props = defineProps({
    routine: Object,
})

const routineStore = useRoutineStore();

const myRoutine = ref(props.routine);
let qtyActionsByRoutine = ref(0);
const errorMsg = ref('');
const errorMessageOn = computed(() => errorMsg.value != '');

onMounted(async () => {
   const result = await routineStore.get(myRoutine.value.id);
   qtyActionsByRoutine.value = result.actions.length;
});

const disable=ref(false);
const isDisabled=computed(()=>disable.value==true);




async function startRoutine() {
    disable.value=true;
    try {
        await routineStore.execute(props.routine.id);
    } catch (e) {
        console.log('Error executing routine:', e);
    }
    disable.value=false;
}

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
    padding-top: 1rem;
}


.btn{
    margin-top: 1rem;
    border-radius: 50%;
    margin-bottom: 1rem;
    font-size: smaller;
    background-color: rgb(var(--v-theme-green_state));
    color: white;
}


</style>
