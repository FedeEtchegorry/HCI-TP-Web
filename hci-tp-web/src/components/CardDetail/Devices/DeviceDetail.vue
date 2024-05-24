<template>
    <EmptyCard>
        <v-card class="title-box">
            <v-row>
                <v-col>
                    <h2>{{ device.name }}</h2>
                    <h3>{{ device.room?.name }}</h3>
                </v-col>
                <v-icon class="setting" @click="toggleDialog">mdi-pencil</v-icon>
            </v-row>
        </v-card>
        
        <component class="device" :is="devices[device.type.name]" :device="device"></component>

        <v-dialog v-model="dialog" persistent max-width="20rem">
            <v-card class="dialog-card">
                <v-card-title>
                    <p class="headline">Editar Dispositivo</p>
                </v-card-title>
                <v-card-text>
                        <v-col>
                                <v-text-field v-model="editedDeviceName" label="Device Name"></v-text-field>
                            <!--
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="editedDeviceRoom" label="Room Name"></v-text-field>
                            </v-col>
                            -->
                            <v-btn class="del-btn" elevation="5" text @click="deleteDevice">Eliminar</v-btn>
                        </v-col>
                </v-card-text>
                <v-card-actions class="mb-3">
                    <v-btn class="canc-btn" elevation="5" text @click="toggleDialog">Cancelar</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn class="save-btn" elevation="5" text @click="modifyDevice">Guardar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </EmptyCard>
</template>


<script setup>
import { ref } from 'vue';
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

const devices = {
    blinds: BlindDetail,
    vacuum: VacuumDetail,
    door: DoorDetail,
    refrigerator: RefrigeratorDetail,
    alarm: AlarmDetail,
};

const toggleDialog = () => {
    dialog.value = !dialog.value;
};

async function deleteDevice(){
    try {
        if(await deviceStore.remove(props.device.id))
            console.log("DEVICE DELETED SUCCESSFULLY");
        else console.log("COULDNT DELETE DEVICE");
    } catch (e) {
        console.log(e);
    }
    toggleDialog();
};

async function modifyDevice(){
    try {
        console.log("TRATO DE ENTRAR")
        if(await deviceStore.modify(props.device.id, [editedDeviceName.value])){
            console.log("DEVICE MODIFIED SUCCESSFULLY");
            device.type.name=editedDeviceName;
        }
        else console.log("COULDNT MODIFY DEVICE");
    } catch (e) {
        console.log(e);
    }
    toggleDialog();
};

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
    font-size: large;
    justify-content: center;
}

.dialog-card{
    display: flex;
    color: rgb(var(--v-theme-primary));
    background-color: rgb(var(--v-theme-secondary_v));
    align-items:center;
}
.del-btn{
    color: rgb(var(--v-theme-primary_v));
    background-color: red;

    font-size: medium;
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
