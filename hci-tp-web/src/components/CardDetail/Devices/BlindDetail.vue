<template>
    <v-card width="15rem">
        <v-slider class="blind" 
            v-model="openPercentage"
            append-icon="mdi-blinds-open"
            prepend-icon="mdi-roller-shade-closed"
            @click:append="openBlind"
            @click:prepend="closeBlind"
            step="1"
            min="0"
            max="100"
            track-fill-color="blue_state"
            track-color="grey"
            track-size="4"
            thumb-label="always"
            thumb-color="blue_state"
            reverse
        ></v-slider>
        <p> {{percentageClosed}}%</p>
    </v-card>
</template>

<script setup>
import { ref, computed, watch, onBeforeMount } from 'vue';
import { useRoomStore } from '@/stores/roomStore';
import { useDeviceStore } from '@/stores/deviceStore';




const openPercentage = ref(0);

const props = defineProps({
    device: Object,
});

const roomStore = useRoomStore();
const deviceStore = useDeviceStore();

const myDevice = ref(props.device);


const deviceId = computed(() => { return myDevice.value.id });
const isOpening = computed(() => { return myDevice.value.state.status == 'opening' });
const isClosing = computed(() => { return myDevice.value.state.status == 'closing' });
const isOpen = computed(() => { return myDevice.value.state.status == 'opened' });
const isClosed = computed(() => { return myDevice.value.state.status == 'closed'});
const percentageClosed = myDevice.value.state.currentLevel;
const position = myDevice.value.state.level;


// Watch for changes in openPercentage and call setPosition
watch(openPercentage, (newValue) => {
    setPosition(newValue);
});

async function setPosition(value) {
    if (value >= 0 && value <= 100) {
        try {await deviceStore.execute(deviceId.value, 'setLevel', [value]);
        openPercentage.value = value;
        console.log(`Open ${openPercentage.value}%`);}
        catch(e){
        console.log(e);
        }   
    }
}

async function openBlind() {
    try {await deviceStore.execute(deviceId.value, 'open', []);
        openPercentage.value = 0;
    }
    catch(e){
        console.log(e);
    }   
}

async function closeBlind() {
    try {await deviceStore.execute(deviceId.value, 'close', []);
        openPercentage.value = 100;
    }
    catch(e){
        console.log(e);
    }   
}


</script>

<style scoped>
.blind {
    color: rgb(var(--v-theme-primary));
    background-color: rgb(var(--v-theme-primary_v));
    accent-color: red;
    margin-top: 2rem;
}
.open-value{
    justify-content: center;
    align-self: center;
    font-size: medium;
}
</style>
