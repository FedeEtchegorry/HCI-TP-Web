<template>
    <v-card class="device">

        <div class="container">
            <div class="temp">
                <v-btn @click="changeFridgeTemp(fridgeTemp + 1)" color="primary">
                    <v-icon>mdi-chevron-up</v-icon>
                </v-btn>
                <v-text-field v-model="fridgeTemp" type="number" class="bold-text" readonly hide-details
                    prepend-inner-icon="mdi-fridge" suffix="°C" single-line></v-text-field>
                <v-btn @click="changeFridgeTemp(fridgeTemp - 1)" color="primary">
                    <v-icon>mdi-chevron-down</v-icon>
                </v-btn>
            </div>

            <div class="temp">
                <v-btn @click="changeFreezerTemp(freezerTemp + 1)" color="primary">
                    <v-icon>mdi-chevron-up</v-icon>
                </v-btn>
                <v-text-field v-model="freezerTemp" type="number" class="bold-text" readonly hide-details
                    prepend-inner-icon="mdi-snowflake" suffix="°C" single-line></v-text-field>
                <v-btn @click="changeFreezerTemp(freezerTemp - 1)" color="primary">
                    <v-icon>mdi-chevron-down</v-icon>
                </v-btn>
            </div>
        </div>


        <v-select item-title="mode" item-value="value" :readonly="!isEditing" label="Select mode" variant="outlined"
            v-model="mode" class="select" :hide-details="true" :items="allMode" @update:modelValue="changeMode">
            <template v-slot:append>
                <v-icon :key="`icon-${isEditing}`" :color="isEditing ? 'success' : 'info'"
                    :icon="isEditing ? 'mdi-check-outline' : 'mdi-circle-edit-outline'"
                    @click="isEditing = !isEditing"></v-icon>
            </template></v-select>
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

let isEditing = ref(false);
let fridgeTemp = ref(myDevice.value.state.temperature)
let freezerTemp = ref(myDevice.value.state.freezerTemperature)
const allMode = [
    { mode: 'Default', value: 'default' },
    { mode: 'Party', value: 'party' },
    { mode: 'Vacation', value: 'vacation' },
]

let mode = ref(allMode.find(m => m.value === myDevice.value.state.mode))

const deviceId = computed(() => { return myDevice.value.id });

async function changeFridgeTemp(value) {
    try {
        if (2 <= value && value <= 8) {
            await deviceStore.execute(deviceId.value, 'setTemperature', [value])
            fridgeTemp.value = value;
        }
    } catch (e) {
        console.log(e);
    }
}

async function changeFreezerTemp(value) {
    try {
        if (-20 <= value && value <= -8) {
            await deviceStore.execute(deviceId.value, 'setFreezerTemperature', [value])
            freezerTemp.value = value;
        }
    } catch (e) {
        console.log(e);
    }
}

async function changeMode() {
    try {
        await deviceStore.execute(deviceId.value, 'setMode', [mode.value])
    } catch (e) {
        console.log(e);
    }
}

</script>

<style scoped>
.select {
    width: 90%;
    max-height: 20%;
}

.bold-text {
    font-weight: bold;
    text-align: center;
}

.container {
    width: 100%;
    display: flex;
    justify-content: space-around;
}

.temp {
    display: flex;
    flex-direction: column;
    width: 45%;
}

.div {
    display: flex;
    align-items: center;
    justify-content: center;
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
