<template>
    <v-card class="device">
        <v-card class="box">
            <p v-if="isOpening || isOpen" class="align-center title">ABIERTO</p>
            <p v-if="isClosing || isClosed" class="align-center title">CERRADO</p>
        </v-card>
        <v-container fluid class="mb-5">
            <v-slider class="blind" 
                v-model="openPercentage"
                step="1"
                min="0"
                max="100"
                track-fill-color="blue_state"
                track-color="grey"
                track-size="6"
                thumb-label="always"
                thumb-color="blue_state"
                height="50" elevation="5"
            ></v-slider>
        </v-container>
        <v-row justify="space-around">
            <v-btn @click="openBlind" :disabled="isOpening || isOpen" color="green" rounded elevation="5">
                <v-icon class="icon mr-2">mdi-blinds-open</v-icon>
                Abrir
            </v-btn>
            <v-btn @click="closeBlind" :disabled="isClosing || isClosed" color="red" rounded elevation="5">
                <v-icon class="icon mr-2">mdi-roller-shade-closed</v-icon>
                Cerrar
            </v-btn>
        </v-row>
    </v-card>
</template>

<script setup>
import { ref, computed, watch, onBeforeMount } from 'vue';
import { useRoomStore } from '@/stores/roomStore';
import { useDeviceStore } from '@/stores/deviceStore';

function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

onBeforeMount(() => {
    openPercentage.value = myDevice.value.state.level;
});

const openPercentage = ref(0);

const props = defineProps({
    device: Object,
});

const roomStore = useRoomStore();
const deviceStore = useDeviceStore();
const myDevice = ref(props.device);

const deviceId = computed(() => myDevice.value.id);
const isOpening = computed(() => myDevice.value.state.status == 'opening');
const isClosing = computed(() => myDevice.value.state.status == 'closing');
const isOpen = computed(() => myDevice.value.state.status == 'opened');
const isClosed = computed(() => myDevice.value.state.status == 'closed');

const debouncedSetPosition = debounce(setPosition, 300);

watch(openPercentage, (newValue) => {
    debouncedSetPosition(newValue);
});

async function setPosition(value) {
    try {
        await deviceStore.execute(deviceId.value, 'setLevel', [value]);
        openPercentage.value = value;
        console.log(`Open ${openPercentage.value}%`);
    } catch (e) {
        console.log(e);
    }
}

async function openBlind() {
    try {
        await deviceStore.execute(deviceId.value, 'open', []);
        myDevice.value.state.status='opening';
    } catch (e) {
        console.log(e);
    }
}

async function closeBlind() {
    try {
        await deviceStore.execute(deviceId.value, 'close', []);
        myDevice.value.state.status='closing';
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

.box {
    background-color: rgb(var(--v-theme-blue_state));
    border-color: black;
    border-width: 0.2rem;
    padding-left: 2rem;
    padding-right: 2rem;
    margin-bottom: 2rem;
}

.title {
    font-size: xx-large;
    font-weight: 500;
    color: white;
    background-color: rgb(var(--v-theme-blue_state));
}
</style>
