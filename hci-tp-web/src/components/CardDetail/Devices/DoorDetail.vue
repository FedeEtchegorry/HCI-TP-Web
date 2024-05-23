<template>
    <v-card class="device">

        <v-btn class="button" variant="outlined" size="124" elevation="24" :disabled="isLocked && !isOpen"
            @click="handleClickStatus">
            <v-icon size="86" :icon="isOpen ? 'mdi-door-open' : 'mdi-door'"></v-icon>
        </v-btn>


        <div class="lock">
            <v-btn class="mb-2" @click="handleClickLock" :icon="isLocked ? 'mdi-lock' : 'mdi-lock-open'" rounded="xl"
                size="x-large" :color="isLocked ? 'red' : 'green'"></v-btn>

            {{ isLocked ? "LOCKED" : "UNLOCKED" }}
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
.button {
    border-radius: 50%;
}

.lock {
    display: flex;
    flex-direction: column;
    align-items: center;
}


.device {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
}
</style>
