<template>
    <v-card class="device">

        <v-btn :disabled="batteryLow" class="button" size="160" :append-icon="batteryLow? '' : !isWorking ? 'mdi-play' : 'mdi-pause'"
            elevation="24" @click="handleClickStatus" :color="!isWorking ? 'green_state' : ''">
            <div v-if="batteryLow">
                <p class="red--text font-weight-bold">BAJA BATERÍA</p>
                <p v-if="!isDocked" class="red--text">NECESITA CARGAR</p>
            </div>
            <div v-else>
                <p v-if="isWorking">PAUSA</p>
                <p v-else>EMPEZAR</p>
            </div>
        </v-btn>

        <div class="actions">
            <div class="mode">
                Cambiar modo
                <v-btn class="mb-2 mode-btn" density="compact"  size="large" @click="handleClickMode">
                    {{ isMopping ? "Trapear" : "Aspirar" }}
                </v-btn>
            </div>
            <div class="mode">
                <v-btn class="mb-2 base-btn" @click="handleClickDock" :disabled="isDocked" icon="mdi-backup-restore" rounded="xl"
                    size="x-large"></v-btn>
            </div>    

            <v-select max-width="40%" return-object item-title="name" v-model="currentLocation" label="Cambiar puerto de carga" :hide-details="true"
                :items="roomStore.rooms" @update:modelValue="changeLocation">
            </v-select>
        </div>
        {{ batteryLevel }}%
        <v-progress-linear :striped="isDocked" width="20" height="20" v-model="batteryLevel" class="bar">
            
        </v-progress-linear>

    </v-card>

</template>

<script setup>
import { useRoomStore } from '@/stores/roomStore';
import { computed, onBeforeMount, ref } from 'vue';
import { useDeviceStore } from '@/stores/deviceStore';

const props = defineProps({
    device: Object,
})

const roomStore = useRoomStore();
const deviceStore = useDeviceStore();

const myDevice = ref(props.device)

let currentLocation = ref(myDevice.value.state.location);

const deviceId = computed(() => { return myDevice.value.id });
const isWorking = computed(() => { return myDevice.value.state.status == 'active' });
const isDocked = computed(() => { return myDevice.value.state.status == 'docked' });
const isMopping = computed(() => { return myDevice.value.state.mode == 'mop' });
const batteryLevel = computed(() => { return myDevice.value.state.batteryLevel })
const batteryLow = computed(() => { return batteryLevel.value < 5 })

async function handleClickStatus() {
    try {
        if (isWorking.value) {
            await deviceStore.execute(deviceId.value, 'pause');
            myDevice.value.state.status = 'pause'
        } else {
            await deviceStore.execute(deviceId.value, 'start');
            myDevice.value.state.status = 'active'
        }
    } catch (e) {
        console.log(e);
    }
}

async function handleClickMode() {
    try {
        if (isMopping.value) {
            await deviceStore.execute(deviceId.value, 'setMode', ['vacuum']);
            myDevice.value.state.mode = 'vacuum'
        } else {
            await deviceStore.execute(deviceId.value, 'setMode', ['mop']);
            myDevice.value.state.mode = 'mop'
        }
    } catch (e) {
        console.log(e);
    }
}

async function handleClickDock() {
    try {
        await deviceStore.execute(deviceId.value, 'dock');
        myDevice.value.state.status = 'docked'
    } catch (e) {
        console.log(e);
    }
}

async function changeLocation() {

    try {
        await deviceStore.execute(deviceId.value, 'setLocation', [currentLocation.value.id]);
        myDevice.value.state.location.id=currentLocation.value.id;
        myDevice.value.state.location.name=currentLocation.value.name;
    } catch (e) {
        console.log(e);
    }
}

onBeforeMount(async () => {
    await roomStore.getAll();
})
</script>

<style scoped>
.device {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
}

.button {
    border-radius: 50%;
}

.mode {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-weight: 500;
    font-size: large;
}
.mode-btn{
    background-color: rgb(var(--v-theme-primary_v));
}
.base-btn{
    background-color: rgb(var(--v-theme-red_state));
}
.bar{
    background-color: yellow;
    color: rgb(var(--v-theme-blue_state));
    
}
.actions {
    display: flex;
    justify-content: space-around;
    width: 100%;
    align-items: center;
}
</style>
