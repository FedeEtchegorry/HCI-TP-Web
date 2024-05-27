<template>
    <EmptyCard class="custom-empty-card" @click="showDetails">
        <v-card class=custom-card>
            <div class="custom-title">
                <h1>{{ routine.name }}</h1>
            </div>
            <!--<v-icon class="custom-icon" :icon="routine.meta.icon"></v-icon>-->
            <v-btn class="btn" :disabled="isDisabled" @click="startRoutine" size="110">COMENZAR</v-btn>
            <v-dialog v-model="routineExecuted" max-width="400">
                <v-card>
                  <v-card-title class="headline">Confirmación</v-card-title>
                  <v-card-text>
                    La rutina se ha ejecutado correctamente
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="routineExecuted = false">Aceptar</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="routineError" max-width="400">
                <v-card>
                  <v-card-title class="headline">Error</v-card-title>
                  <v-card-text>
                    La rutina no se ha podido ejecutar
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" text @click="routineError = false">Aceptar</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
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
const routineError = ref(false);
const routineExecuted = ref(false);
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
        routineExecuted.value=true;
    } catch (e) {
        routineError.value=true;
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
