<template>
    <v-card class="device">

        <v-btn class="button" size="200" :append-icon="!isWorking ? 'mdi-play' : 'mdi-pause'" elevation="24"
            @click="handleClickStatus" :color="!isWorking ? 'green' : ''">
            {{ !isWorking ? "START" : "PAUSE" }}
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
        </div>

    </v-card>

</template>

<script setup>
import { useRoomStore } from '@/stores/roomStore';
import { computed, ref } from 'vue';
import { useDeviceStore } from '@/stores/deviceStore';

const props = defineProps({
    device: Object,
})

const roomStore = useRoomStore();
const deviceStore = useDeviceStore();

const myDevice = ref(props.device)

const deviceId = computed(() => { return myDevice.value.id });
const isWorking = computed(() => { return myDevice.value.state.status == 'active' });
const isDocked = computed(() => { return myDevice.value.state.status == 'docked' });
const isMopping = computed(() => { return myDevice.value.state.mode == 'mop' });

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
