<template>
    <v-card class="device">
        <v-card :class="isClosed || isClosing ? 'boxClose' : 'boxOpen'">
             <p v-show="isClosed" class="title">CERRADO</p>
             <p v-show="isClosing" class="title">CERRANDO</p>
             <p v-show="isOpened" class="title">ABIERTO</p>
             <p v-show="isOpening" class="title">ABRIENDO</p>
        </v-card>
        <v-container class="mb-3">
            <v-slider append-icon="mdi-window-shutter" prepend-icon="mdi-window-shutter-open"
                @click:append="openPercentage += 1" @click:prepend="openPercentage -= 1" v-model="openPercentage" step="1"
                min="0" max="100" track-fill-color="blue_state" track-color="grey" track-size="6" thumb-label="always"
                thumb-color="blue_state" height="50" elevation="24" persistent-hint hint="Nivel de ventana"></v-slider>
        </v-container>
        <v-row>
            <v-btn class="mr-1 button" @click="toggleBlind" :color="isClosed || isClosing ? 'green_state' : 'red_state'" rounded elevation="24">
        <v-icon class="icon mr-1">{{ isClosed || isClosing ? 'mdi-blinds-open' : 'mdi-roller-shade-closed' }}</v-icon>
        {{ isClosed || isClosing ? 'Abrir' : 'Cerrar' }}
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
const isOpened = computed(() => myDevice.value.state.status == 'opened');
const isClosed = computed(() => myDevice.value.state.status == 'closed');

const debouncedSetPosition = debounce(setPosition, 300);

watch(openPercentage, (newValue) => {
    debouncedSetPosition(newValue);
});

const toggleBlind = () => {
    if (isClosed.value || isClosing.value) {
        openBlind();
    } else {
        closeBlind();
    }
};

async function setPosition(value) {
    try {
        await deviceStore.execute(deviceId.value, 'setLevel', [value]);
        openPercentage.value = value;
    } catch (e) {
        console.log(e);
    }
}

async function openBlind() {
    try {
        await deviceStore.execute(deviceId.value, 'open', []);
        myDevice.value.state.status = 'opening';
    } catch (e) {
        console.log(e);
    }
}

async function closeBlind() {
    try {
        await deviceStore.execute(deviceId.value, 'close', []);
        myDevice.value.state.status = 'closing';
    } catch (e) {
        console.log(e);
    }
}
</script>

<style scoped>
.device {
    padding: 10% 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    flex-grow: 1;
}

.boxClose {
    background-color: rgb(var(--v-theme-primary));
    border-color: black;
    border-width: 0.2rem;
    padding-left: 1rem;
    padding-right: 1rem;
    margin-bottom: 1rem;
    color: rgb(var(--v-theme-primary_v));
}
.boxOpen {
    background-color: white;
    color: rgb(var(--v-theme-primary));
    border-color: black;
    border-width: 0.2rem;
    padding-left: 1rem;
    padding-right: 1rem;
}

.title {
    font-size: xx-large;
    font-weight: 500;
}

.button {
    font-size: large;
}
</style>
