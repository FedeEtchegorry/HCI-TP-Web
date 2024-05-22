<template>
    <v-card class="device">

        <v-btn class="mb-2" rounded="xl" :disabled="isLocked && !isOpen" elevation="24" size="x-large" @click="handleClickStatus"
            :color="isOpen ? '' : 'green'">
            {{ isOpen ? "CLOSE" : "OPEN" }}
        </v-btn>

        <div class="lock">
            <v-btn class="mb-2" @click="handleClickLock" :icon="isLocked ? 'mdi-lock' : 'mdi-lock-open'" rounded="xl"
                size="x-large" :color="isLocked ? 'red' : 'green'"></v-btn>

            {{isLocked ? "LOCKED" : "UNLOCKED"}}
        </div>
        
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
</v-text-field> -->


        <!-- <v-switch :value='status' color="green" inset></v-switch> -->
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
const isOpen = computed(() => { return myDevice.value.state.status == 'opened' });
const isLocked = computed(() => { return myDevice.value.state.lock == 'locked' });

async function handleClickStatus() {
    try {
        if (isOpen.value) {
            await deviceStore.execute(deviceId.value, 'close');
            myDevice.value.state.status = 'closed'
        } else {
            await deviceStore.execute(deviceId.value, 'open');
            myDevice.value.state.status = 'opened'
        }
    } catch (e) {
        console.log(e);
    }
}

async function handleClickLock() {
    try {
        if (isLocked.value) {
            await deviceStore.execute(deviceId.value, 'unlock');
            myDevice.value.state.lock = 'unlocked'
        } else {
            await deviceStore.execute(deviceId.value, 'lock');
            myDevice.value.state.lock = 'locked'
        }
    } catch (e) {
        console.log(e);
    }
}


</script>

<style scoped>
.lock {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.device {
    padding: 10%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    flex-grow: 1;
}
</style>
