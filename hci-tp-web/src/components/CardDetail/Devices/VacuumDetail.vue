<template>
    <v-card class="device">

        <v-btn :disabled="batteryLow" class="button" size="160" :append-icon="batteryLow? '' : !isWorking ? 'mdi-play' : 'mdi-pause'"
            elevation="24" @click="handleClickStatus" :color="!isWorking ? 'green' : ''">
            <div v-if="batteryLow">
                <p class="red--text font-weight-bold">LOW BATTERY</p>
                <p v-if="!isDocked" class="red--text">PLEASE DOCK</p>
            </div>
            <div v-else>
                <p v-if="isWorking">PAUSE</p>
                <p v-else>START</p>
            </div>
        </v-btn>

        <div class="actions">
            <div class="mode">
                Change Mode
                <v-btn class="mb-2 mode-btn" density="compact" color="blue_state" size="large" @click="handleClickMode">
                    {{ isMopping ? "Mop" : "Vacuum" }}
                </v-btn>
            </div>

            <v-btn class="mb-2" @click="handleClickDock" :disabled="isDocked" icon="mdi-backup-restore" rounded="xl"
                size="x-large" color="red"></v-btn>

            <v-select max-width="40%" return-object item-title="name" v-model="currentLocation" label="Change dock station" :hide-details="true"
                :items="roomStore.rooms" @update:modelValue="changeLocation">
            </v-select>
        </div>

        <v-progress-linear :striped="isDocked" width="20" height="20" v-model="batteryLevel" color="amber">
            {{ batteryLevel }}%
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

.actions {
    display: flex;
    justify-content: space-around;
    width: 100%;
}
</style>
