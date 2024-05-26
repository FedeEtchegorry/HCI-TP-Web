<template>
    <v-card class="device">
        <h3 v-if="isArmAway">ACTIVA - FUERA DE CASA</h3>
        <h3 v-if="isArmStay">ACTIVA - DENTRO DE CASA</h3>
        <h3 v-if="isDisarm">DESACTIVADA</h3>
        <v-row class="row" >
            <v-text-field class="input-class-1" v-model="input" label="Pass (4 caracteres)" maxlength="4" single-line
                type="Number" variant="outlined" rounded hide-details></v-text-field>
            <p v-if="hasError" class="error">ERROR-CÓDIGO INCORRECTO</p>
        </v-row>
        <v-text-field v-show="changePassOn" class="input-class-2" v-model="input_2"
            label="Nueva contraseña (4 caracteres)" maxlength="4" single-line type="Number" variant="outlined" rounded
            hide-details></v-text-field>
        <v-btn v-show="!isDisarm && !changePassOn" @click="disarm" rounded size="large" class="mb-1 color-red"><v-icon
                size="30">mdi-lock-open</v-icon>
            Desactivar
        </v-btn>
        <v-btn v-show="isDisarm && !changePassOn" class="mb-1 button-arm" @click="armedAway" rounded size="large"><v-icon size="30">mdi-lock</v-icon>
            Activar-Fuera
        </v-btn>
        <v-btn v-show="isDisarm && !changePassOn" class="mb-1 button-arm" @click="armedStay" rounded size="large"><v-icon size="30">mdi-home-lock</v-icon>
            Activar-En casa
        </v-btn>
        <v-btn v-if="!changePassOn" class="mb-1 color-blue" @click="changePasstoOn" rounded size="large">
            Cambiar contraseña
        </v-btn>
        <v-btn v-if="changePassOn" class="mb-1 color-blue" @click="changePasscode" rounded size="large">
            Confirmar contraseña
        </v-btn>


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

const myDevice = ref(props.device);
const input = ref('');
const input_2 = ref('');
const passcode = computed(() => input.value);
const passcode_2 = computed(() => input_2.value);

const error = ref(false);
const changePass = ref(false);

const deviceId = computed(() => myDevice.value.id);
const isDisarm = computed(() => myDevice.value.state.status == 'disarmed');
const isArmStay = computed(() => myDevice.value.state.status == 'armedStay');
const isArmAway = computed(() => myDevice.value.state.status == 'armedAway');
const hasError = computed(() => error.value == true);
const changePassOn = computed(() => changePass.value == true);

function changePasstoOn() {
    changePass.value = true;
}

async function disarm() {
    try {
        if (passcode.value.length != 4) {
            error.value = true;
            return;
        }
        if (await deviceStore.execute(deviceId.value, 'disarm', [passcode.value])) {
            myDevice.value.state.status = 'disarmed';
            error.value = false;
        }
        else error.value = true;
    } catch (e) {
        console.error(e);
    }
    input.value = ' ';
}
async function armedAway() {
    try {
        if (passcode.value.length != 4) {
            error.value = true;
            return;
        }
        if (await deviceStore.execute(deviceId.value, 'armAway', [passcode.value])) {
            myDevice.value.state.status = 'armedAway';
            error.value = false;
        }
        else error.value = true;
    } catch (e) {
        console.error(e);
    }
    input.value = '';
}

async function armedStay() {
    try {
        if (passcode.value.length != 4) {
            error.value = true;
            return;
        }
        if (await deviceStore.execute(deviceId.value, 'armStay', [passcode.value])) {
            myDevice.value.state.status = 'armedStay';
            error.value = false;
        }
        else error.value = true;
    } catch (e) {
        console.error(e);
    }
    input.value = '';
}

async function changePasscode() {
    try {
        if (passcode_2.value.length != 4 || passcode.value.length != 4) {
            error.value = true;
            return;
        }

        if (await deviceStore.execute(deviceId.value, 'changeSecurityCode', [passcode.value, passcode_2.value])) {
            changePass.value = false;
            error.value = false;
        } else {
            error.value = true;
        }
    } catch (e) {
        console.error(e);
    }
    input.value = '';
    input_2.value = ''
}

</script>


<style scoped>
.device {
    padding: 5%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    flex-grow: 1;
    font-weight: 700;
    font-size: large;
}

.input-class-1 {
    align-items: center;
    justify-items: center;
    font-weight: 900;
    width: 70%;
}

.input-class-2 {
    align-items: center;
    justify-items: center;
    font-weight: 900;
    width: 100%;
}

.row {
    align-items: center;
    justify-items: center;
    width: 100%;
    justify-content: space-around;
}

.error {

    justify-self: center;
    align-self: left;
    color: red;
}
.button-arm{
    background-color: rgb(var(--v-theme-green_state));
    color: white;
}   

.arm {
    width: 95%;
}

.v-btn {
    width: 100%;
    align-items: center;
    justify-content: center;
    height: 2.5rem;
}

.color-blue{
    background-color:rgb(var(--v-theme-blue_state));
    color:rgb(var(--v-theme-primary_v));
}
.color-red{
    background-color:rgb(var(--v-theme-red_state));
    color:rgb(var(--v-theme-primary_v));
}
</style>
