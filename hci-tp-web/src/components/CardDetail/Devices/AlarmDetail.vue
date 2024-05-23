<template>
    <v-card class="device">
        <p v-if="isArmAway">ACTIVA - FUERA DE CASA</p>
        <p v-if="isArmStay">ACTIVA - DENTRO DE CASA</p>
        <p v-if="isDisarm">DESACTIVADA</p>
        <v-row class="row">
        
        <v-text-field class="input-class"
            v-model="input"
            label="Pass (4 caracteres)"
            maxlength="4"
            single-line
            type="Number"
            variant="outlined"
            rounded
            hide-details
        ></v-text-field>
        <v-text-field v-show="changePassOn"
            class="input-class"
            v-model="input_2"
            label="Nueva contraseña (4 caracteres)"
            maxlength="4"
            single-line
            type="Number"
            variant="outlined"
            rounded
            hide-details
        ></v-text-field>
        <p v-if="hasError" class="error" color="red">ERROR</p>
        </v-row>
                <v-btn
                    v-show="!isDisarm && !changePassOn"
                    @click="disarm"
                    rounded
                    size="large"
                    color="red"
                ><v-icon size="30">mdi-lock-open</v-icon>
                    Desactivar
                </v-btn>
                <v-btn
                    v-show="isDisarm && !changePassOn"
                    class="mb-1"
                    @click="armedAway"
                    rounded
                    size="large"
                    color="green"
                ><v-icon size="30">mdi-lock</v-icon>
                    Activar-Fuera 
                </v-btn>
                <v-btn
                    v-show="isDisarm && !changePassOn"
                    class="mb-1"
                    @click="armedStay"
                    rounded
                    size="large"
                    color="green"
                ><v-icon size="30">mdi-home-lock</v-icon>
                    Activar-En casa
                </v-btn>
                <v-btn
                    class="mb-1"
                    @click="changePassOn? changePasscode:changePassValue"
                    rounded
                    size="large"
                    color="blue_state"
                >
                    Cambiar contraseña
                </v-btn>
    </v-card>
</template>


<script setup>
import { useRoomStore } from '@/stores/roomStore';
import { computed, ref} from 'vue';
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
const changePass=ref(false);

const deviceId = computed(() => myDevice.value.id);
const isDisarm = computed(() => myDevice.value.state.status == 'disarmed');
const isArmStay = computed(() => myDevice.value.state.status == 'armedStay');
const isArmAway = computed(() => myDevice.value.state.status == 'armedAway');
const hasError = computed(() => error.value==true);
const changePassOn = computed(() => changePass.value==true);
const changePassValue = computed(() => changePass.value=!changePass.value);


async function disarm() {
    try {
        if (passcode.value.length!=4){
            error.value = true;
            return;
        }
        if(await deviceStore.execute(deviceId.value, 'disarm', [passcode.value])){
            myDevice.value.state.status = 'disarmed';
            error.value=false;
        }
        else error.value=true;
    } catch (e) {
        console.error(e);
    }
}
async function armedAway() {
    try {
        if (passcode.value.length!=4){
            error.value = true;
            return;
        }
        if (await deviceStore.execute(deviceId.value, 'armAway', [passcode.value])){
            myDevice.value.state.status = 'armedAway';
            error.value=false;
        }
        else error.value=true;
    } catch (e) {
        console.error(e);
    }
}

async function armedStay() {
    try {
        if (passcode.value.length!=4){
            error.value = true;
            return;
        }
        if (await deviceStore.execute(deviceId.value, 'armStay', [passcode.value])){
            myDevice.value.state.status = 'armedStay';
            error.value=false;
        }
        else error.value=true;
    } catch (e) {
        console.error(e);
    }
}

async function changePasscode(){
    try {
        if (passcode_2.value.length!=4 || passcode.value.length!=4){
            error.value = true;
            return;
        }
        
        if (await deviceStore.execute(deviceId.value, 'changeSecurityCode', [passcode.value, passcode_2.value])) {
            changePassValue;
            error.value = false; 
        } else {
            error.value = true; 
        }
    } catch (e) {
        console.error(e);
    }
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

.input-class{
    align-items: center;
    justify-items: center;
    width: 70%;
    font-weight: 900;
}

.error{
    justify-self: center;
    align-self: center;
    color: red;
    margin-left: 1rem;
}

.arm {
    width: 95%;
}

.v-btn{
    width: 100%;
    align-items: center;
    justify-content: center;
    height: 2.5rem;
}


</style>
