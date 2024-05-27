<template>
    <EmptyDeviceDialog>
        <v-toolbar density="comfortable" class="title"> 
            <v-toolbar-title>{{ device.name }}</v-toolbar-title>
            <v-spacer></v-spacer>

            <v-btn @click="toggleDialog" icon>
                <v-icon >mdi-menu</v-icon>
            </v-btn >
            <v-btn icon>
                <v-icon @click="isActive = false">mdi-close</v-icon>
            </v-btn>
        </v-toolbar>

        <component class="device" :is="devices[device.type.name]" :device="device"></component>

        <v-dialog rounded v-model="dialog" width="30%" height="50%">
            <v-card class="dialog-card" height="100%">
                <v-toolbar density="comfortable" class="title">
                    <v-toolbar-title>Editar Dispositivo</v-toolbar-title>
                </v-toolbar>
                <v-text-field hide-details class="text-field ma-4" rounded variant="outlined" v-model="editedDeviceName"
                    label="Nombre del dispositivo" :rules="[
                        v => !!v || 'El nombre es obligatorio',
                        v => (v && v.length <= 15) || 'El nombre no puede tener más de 25 letras'
                    ]"></v-text-field>
                <v-select v-if="!isDeviceAssignedToRoom" class="text-field" :items=roomsForDevice.options rounded
                    variant="outlined" v-model="editedDeviceRoom" label="Nombre de la habitación"></v-select>
                <v-btn v-else class="unlink-btn" rounded elevation="5" text @click="unlinkFromRoom">Desvincular de {{
                    props.device.room?.name }}</v-btn>
                <p v-show="errorMessageOn">{{ errorMsg }}</p>

                <v-btn class="del-btn" elevation="5" text @click="deleteDevice">Eliminar</v-btn>
                <v-card-actions class="mb-3">
                    <v-btn class="save-btn" rounded elevation="5" text @click="modifyDevice">Guardar</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn class="canc-btn" rounded elevation="5" text @click="toggleDialog">Cancelar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </EmptyDeviceDialog>
</template>



<script setup>
import { ref, computed, onMounted } from 'vue';
import EmptyDeviceDialog from '../EmptyDeviceDetail.vue';
import DoorDetail from './DoorDetail.vue';
import BlindDetail from './BlindDetail.vue';
import RefrigeratorDetail from './RefrigeratorDetail.vue';
import VacuumDetail from './VacuumDetail.vue';
import AlarmDetail from './AlarmDetail.vue';
import { useDeviceStore } from '@/stores/deviceStore';
import { useRoomStore } from '@/stores/roomStore';

let isActive = defineModel();
let roomsForDevice;
const roomStore = useRoomStore();


onMounted(async () => {
    await roomStore.getAll();
    roomsForDevice = {
        options: roomStore.rooms.map(room => room.name),
    };
});


const props = defineProps({
    device: Object,
});

const dialog = ref(false);
const editedDeviceName = ref(props.device.name);
const editedDeviceRoom = ref(props.device.room?.name);
const deviceStore = useDeviceStore();
const errorMsg = ref('');
const errorMessageOn = computed(() => errorMsg.value != '');

const isDeviceAssignedToRoom = computed(() => props.device.room != null)
const hasChangedRoom = computed(() => props.device.room?.name == editedDeviceRoom);

const devices = {
    blinds: BlindDetail,
    vacuum: VacuumDetail,
    door: DoorDetail,
    refrigerator: RefrigeratorDetail,
    alarm: AlarmDetail,
};

const toggleDialog = () => {
    dialog.value = !dialog.value;
    errorMsg.value = '';
};

async function deleteDevice() {
    try {
        await deviceStore.remove(props.device.id);
        toggleDialog();
        window.location.reload();
    } catch (e) {
        console.log(e);
        errorMsg.value = "Error al borrar dispositivo";
    }
};

async function unlinkFromRoom() {
    try {
        if (await roomStore.removeDeviceFromRoom(props.device.id))
            props.device.room = null;
    } catch (e) {
        errorMsg.value = "Error al desvincular dispositivo";
    }
}


async function modifyDevice() {
    try {
        props.device.name = editedDeviceName.value;
        if (editedDeviceName.value.length < 20 && await deviceStore.modify(props.device)) {
            toggleDialog();
        } else {
            errorMsg.value = "Error al editar dispositivo";
        }
    } catch (e) {
        console.error(e);
        errorMsg.value = "Error al editar dispositivo";
    }

    if (hasChangedRoom) {
        try {
            await roomStore.addDeviceToRoom(roomStore.rooms.find(room => room.name == editedDeviceRoom.value).id, props.device.id);
            errorMsg.value = '';
        } catch (e) {
            errorMsg.value = 'No se pudo cambiar la habitación del dispositivo'
        }
        window.location.reload();
    }
}

</script>


<style scoped>
.title{
    background: rgb(var(--v-theme-primary));
    color: rgb(var(--v-theme-primary_v));
}

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

.dialog-card {
    display: flex;
    color: rgb(var(--v-theme-primary));
    background-color: rgb(var(--v-theme-primary_v));
    align-items: center;
    justify-content: center;
    width: 100%;
}

.text-field {
    width: 15rem;
    min-width: 10rem;
}

.del-btn {
    color: rgb(var(--v-theme-primary_v));
    background-color: rgb(var(--v-theme-red_state));
    font-size: smaller;
    margin-bottom: 1rem;
}

.unlink-btn {
    color: rgb(var(--v-theme-primary_v));
    background-color: rgb(var(--v-theme-red_state));
    font-size: small;
    margin-bottom: 1rem;
}

.canc-btn {
    color: rgb(var(--v-theme-primary));
    background-color: rgb(var(--v-theme-primary_v));

    font-size: medium;
}

.save-btn {
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
