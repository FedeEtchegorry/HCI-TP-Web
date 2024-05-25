<template>
    <EmptyCard>
        <v-card class="title-box">
            <v-row>
                <v-col>
                    <h2>{{ device.name }}</h2>
                    <h3>{{ device.room?.name }}</h3>
                </v-col>
                <v-icon class="setting" @click="toggleDialog">mdi-menu</v-icon>
            </v-row>
        </v-card>
        
        <component class="device" :is="devices[device.type.name]" :device="device"></component>

        <v-dialog rounded v-model="dialog" persistent max-width="20rem">
            <v-card class="dialog-card">
                <v-card-title>
                    <h3 class="headline">Editar Dispositivo</h3>
                </v-card-title>
                <v-text-field class="text-field" rounded variant="outlined" v-model="editedDeviceName" label="Nombre del dispositivo" :rules="[
                                    v => !!v || 'El nombre es obligatorio',
                                    v => (v && v.length <= 15) || 'El nombre no puede tener más de 25 letras'
                                ]"></v-text-field>
                <v-text-field class="text-field" rounded variant="outlined" v-model="editedDeviceRoom" label="Nombre de la habitación"></v-text-field>
                <p v-show="errorMessageOn">{{ errorMsg }}</p>
                <v-btn class="del-btn" elevation="5" text @click="deleteDevice">Eliminar</v-btn>
                <v-card-actions class="mb-3">
                    <v-btn class="save-btn" rounded elevation="5" text @click="modifyDevice">Guardar</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn class="canc-btn" rounded elevation="5" text @click="toggleDialog">Cancelar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </EmptyCard>
</template>



<script setup>
import { ref, computed } from 'vue';
import EmptyCard from '../EmptyCard.vue';
import DoorDetail from './DoorDetail.vue';
import BlindDetail from './BlindDetail.vue';
import RefrigeratorDetail from './RefrigeratorDetail.vue';
import VacuumDetail from './VacuumDetail.vue';
import AlarmDetail from './AlarmDetail.vue';
import { useDeviceStore } from '@/stores/deviceStore';

const props = defineProps({
    device: Object,
});

const dialog = ref(false);
const editedDeviceName = ref(props.device.name);
const editedDeviceRoom = ref(props.device.room?.name);
const deviceStore = useDeviceStore();
const errorMsg=ref('');
const errorMessageOn =computed(()=>errorMsg.value!='');


const devices = {
    blinds: BlindDetail,
    vacuum: VacuumDetail,
    door: DoorDetail,
    refrigerator: RefrigeratorDetail,
    alarm: AlarmDetail,
};

const toggleDialog = () => {
    dialog.value = !dialog.value;
    errorMsg.value='';
};

async function deleteDevice(){
    try {
        await deviceStore.remove(props.device.id);
        toggleDialog();
    } catch (e) {
        console.log(e);
        errorMsg.value="Error al borrar dispositivo";
    }
};

async function modifyDevice() {
    try {
        const updatedDevice = {
            id: props.device.id,
            name: editedDeviceName.value,
        };
        if (editedDeviceName.value.length<20 && await deviceStore.modify(updatedDevice)) {
            props.device.name = editedDeviceName.value;
            toggleDialog();
        } else {
            errorMsg.value = "Error al editar dispositivo";
        }
    } catch (e) {
        console.error(e);
        errorMsg.value = "Error al editar dispositivo";
    }
}

</script>


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
    font-size: medium;
    justify-content: center;
    padding-left: 5%;
    padding-right: 5%;
}

.dialog-card{
    display: flex;
    color: rgb(var(--v-theme-primary));
    background-color: rgb(var(--v-theme-primary_v));
    align-items:center;
    width: 100%;
}
.text-field{
    width: 15rem;
    min-width: 10rem;

} 
.del-btn{
    color: rgb(var(--v-theme-primary_v));
    background-color: red;
    font-size: medium;
    margin-bottom: 1rem;
}
.canc-btn{
    color: rgb(var(--v-theme-primary));
    background-color: rgb(var(--v-theme-primary_v));
    
    font-size: medium;
}
.save-btn{
    color: rgb(var(--v-theme-primary_v));
    background-color: rgb(var(--v-theme-blue_state));
    font-size: medium;
}

.setting {
    color: rgb(var(--v-theme-primary_));
    background-color: rgb(var(--v-theme-primary));
    border-radius: 50%;
    align-self: center;
    font-size: 1.5rem;
}
</style>
