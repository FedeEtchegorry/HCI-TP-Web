<template>
    <v-card class="device">

        <v-btn :append-icon="!isWorking ? 'mdi-play' : 'mdi-pause'" class="mb-2" rounded="xl" elevation="24"
            size="x-large" @click="handleClickStatus" :color="!isWorking ? 'green' : ''">
            {{ !isWorking ? "START" : "PAUSE" }}
        </v-btn>

        <div class="actions">
            <div class="mode">
                Change Mode
                <v-btn class="mb-2" density="compact" size="large" @click="handleClickMode">
                    {{ isMopping ? "Mop" : "Vacuum" }}
                </v-btn>
            </div>
            <v-btn class="mb-2" @click="handleClickDock" :disabled="isDocked" icon="mdi-backup-restore" rounded="xl"
                size="x-large" color="red"></v-btn>
        </div>
        <!-- <v-select label="DockRoom" :items="roomStore.rooms"></v-select> -->
        <!-- <v-item-group class="mode">
            <v-item default v-for="n in 2" v-slot="{ isSelected, selectedClass, toggle}">
                <v-card
                :class="selectedClass"
                dark
                @click="toggle"
              >
                <div
                  class="text-h5 flex flex-columns text-center"
                >
                  {{ isSelected ? 'Suction' : 'Mop' }}
                </div>
              </v-card>
            </v-item>
        </v-item-group> -->
        <!-- <v-text-field v-model="value" type="Number">
            <template v-slot:append>
                <v-btn icon @click="value++">
                    <v-icon>mdi-chevron-up</v-icon>
                </v-btn>
            </template>
<template v-slot:prepend>
                <v-btn icon @click="value--">
                    <v-icon>mdi-chevron-down</v-icon>
                </v-btn>
            </template>
</v-text-field>


<v-switch :value='status' color="green" inset></v-switch> -->
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
    padding: 10%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    flex-grow: 1;
}

.mode {
    display: flex;
    flex-direction: column;
}

.actions {
    display: flex;
    justify-content: space-around;
    width: 100%;
}
</style>
