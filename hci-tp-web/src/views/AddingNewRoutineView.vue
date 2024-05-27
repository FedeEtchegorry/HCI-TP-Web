<template>
    <v-dialog v-model="props.addOptionActive" class="add-routine-dialog">
      <v-card class="rounded-xl add-routine-card">

        <v-card-title class="add-routine-title">
          <v-row class="add-routine-row">
            <v-col cols="12" sm="6">
                <v-text-field
                    v-model="routine.name"
                    class="add-routine-large-field"
                    label="Nombre de Nueva Rutina"
                    :rules="[v => !!v || 'El nombre es obligatorio']"
                    required
                    rounded
                    outlined
                    variant="outlined"
                ></v-text-field>
            </v-col>
            <v-col class="add-routine-day-buttons-col">
              <v-btn v-for="(day, index) in routine.days" :key="index" :class="day.active === true ? 'add-routine-day-button add-routine-day-button-selected' : 'add-routine-day-button'" @click="toggleDay(index)">
                {{ day.day }}
              </v-btn>
            </v-col>
          </v-row>
        </v-card-title>

        <div class="add-routine-coarse-divider"></div>
        
        <v-card-text class="add-routine-devices-section">

          <v-col v-for="(row, index) in routine.devices" :key="index">

            <v-row class="add-routine-row" cols="12" sm="6">
              <span class="add-routine-number-span">{{index+1}}°</span>
              <v-select
                v-model="row.device"
                @update:model-value="calculatePossibleActions(row.device)"
                class="add-routine-flexible-field"
                :items="deviceNames"
                label="Dispositivo"
                required
                rounded
                variant="outlined"
              ></v-select>
              <v-select
                v-model="row.action"
                @update:focused="calculatePossibleActions(row.device); calculatePossibleParameters(row.action);"
                class="add-routine-flexible-field"
                :items="possibleActions"
                label="Acción"
                rounded
                variant="outlined"
              ></v-select>

              <v-text-field
                v-model="row.param"
                @update:focused="calculatePossibleActions(row.device); calculatePossibleParameters(row.action);"
                class="add-routine-flexible-field"
                label="Parametro"
                rounded
                variant="outlined"
                :readonly="!possibleParameters"
              ></v-text-field>
              <v-btn class="add-routine-delete-device" icon="mdi-delete" size="40" @click="deleteDevice(index)"></v-btn>
            </v-row>

            <div class="add-routine-thin-divider"></div>

          </v-col>

          <v-col cols="12" class="add-routine-add-new-device-col">
            <v-btn class="add-routine-add-new-device-button" @click="addDeviceToRoutine">+ Agregar otro dispositivo +</v-btn>
          </v-col>

        </v-card-text>

        <div class="add-routine-coarse-divider"></div>

        <v-card-actions>
          <v-btn class="add-routine-confirm-button" text @click="saveRoutine">Confirmar</v-btn>
          <v-spacer></v-spacer>
          <v-btn class="add-routine-cancel-button" text @click="closeDialog">Cancelar</v-btn>
        </v-card-actions>

        <span v-if="errorMessageOn" class="add-routine-error" v-show="props.errorMessageOn">{{ props.errorMsg }}</span>

      </v-card>
    </v-dialog>
</template>
  
<script setup>

import { ref, computed } from 'vue';

const routine = ref({
  name: '',
  devices: [{ device: '', action: '', param: ''}],
  days: [
    { day: 'L', active: false },
    { day: 'M', active: false },
    { day: 'X', active: false },
    { day: 'J', active: false },
    { day: 'V', active: false },
    { day: 'S', active: false },
    { day: 'D', active: false }
  ]
});

const emit = defineEmits(['newRoutineEvent']);
const closeDialog = () => emit('newRoutineEvent', null);
const saveRoutine = () => emit('newRoutineEvent', routine);
const addDeviceToRoutine = () => routine.value.devices.push({ device: '', action: '', param: ''});
const toggleDay = (index) => { routine.value.days[index].active = !routine.value.days[index].active; }
const deleteDevice = (index) => { routine.value.devices.splice(index, 1); }
const possibleActions = ref([]);
const possibleParameters = ref(false);

const props = defineProps({

  errorMessageOn:{
      type: Boolean,
      required: true
  },
  errorMsg:{
      type: String,
      required:true
  },
  addOptionActive: {
    type: Boolean,
    required: true
  },
  myDevices: {  // Devices es un arreglo de los dispositivos soportados que contiene "nombre", "Tipo" y un arreglo de strings de sus posibles acciones
    required: true,
    type: Object
  }
});

const deviceNames = computed(() => props.myDevices.map(device => device.name));

function getDeviceActions(deviceType) {
  switch (deviceType) {
    case 'alarm':
      return ['Activar Casa','Activar Fuera', 'Desactivar'];
    case 'blinds':
      return ['Abrir', 'Cerrar', 'Establecer Posición'];
    case 'vacuum':
      return ['Iniciar', 'Pausar', 'Regresar Base de Carga'];
    case 'door':
      return ['Abrir', 'Cerrar', 'Bloquear', 'Desbloquear'];
    case 'refrigerator':
      return ['Establecer Temp. Freezer', 'Establecer Temp.', 'Modo fiesta', 'Modo default', 'Modo vacaciones'];
    default:
      return null;
  }
}

function getActionParameter(actionType) {

  switch (actionType) {

    case 'Establecer Temp. Freezer':
    case 'Establecer Posición':
      return true;
    case 'Abrir':
    case 'Cerrar':
    case 'Pausar':
    case 'Activar':
    case 'Iniciar':
    case 'Bloquear':
    case 'Desactivar':
    case 'Desbloquear':
    case 'Modo fiesta':
    case 'Modo default':
    case 'Modo vacaciones':
    case 'Regresar Base de Carga':
      return false;
    default:
      return false;
  }
}

const calculatePossibleActions = (deviceSelected) => {

  const thisDevice = props.myDevices.find(myDevice => myDevice.name === deviceSelected);

  if (thisDevice) {
    possibleActions.value = getDeviceActions(thisDevice.type);
  } else {
    possibleActions.value = [];
  }
};

const calculatePossibleParameters = (actionSelected) => {

  if (actionSelected) {
    possibleParameters.value = getActionParameter(actionSelected);
  }
  else {
    possibleParameters.value = false;
  }

}

</script>
  
<style scoped>

.add-routine-dialog {
  max-width: 60rem;
  width: 85%;

}
.add-routine-card {
  background-color: rgb(var(--v-theme-primary_v));
  max-height: 60rem;
  padding-bottom: .5rem;
}

.add-routine-large-field {
  margin-top: 1rem;
  min-width: 50%;
}

.add-routine-title {
  height: 7rem;
}

.add-routine-flexible-field {
  margin: .5rem .5rem;
}

.add-routine-row {
  display: flex;
  justify-items: center;
  align-items: center;
}

.add-routine-devices-section {
  max-height: 25rem;
  overflow-y: auto;
}

.add-routine-day-buttons-col {
  display: flex;
  justify-content: center;
  justify-items: center;
  min-width: 50%;
}

.add-routine-day-button {
  background-color: lightgray;
  color: black;
  border-radius: 50%;
  min-height: 1.5rem;
  min-width: 1.5rem;
  margin-inline: .4rem;
  box-shadow: 0rem .35rem .2rem rgba(0, 0, 0, 0.4);
}

.add-routine-day-button-selected {
  background-color: rgb(var(--v-theme-blue_state));
  color: white;
  min-height: 2.25rem;
  box-shadow: inset 0rem .35rem .2rem rgba(0, 0, 0, 0.4);
}

.add-routine-coarse-divider {
  border-bottom: .12rem solid #000;
  margin-inline: .8rem;
  margin-bottom: .5rem;
}

.add-routine-thin-divider {
  border-top: .07rem solid #000;
  margin-bottom: 1rem;
}

.add-routine-add-new-device-col {
  display: flex;
  justify-content: center;
}

.add-routine-delete-device {
  margin-left: .9rem;
  margin-bottom: 1.5rem;
}

.add-routine-number-span {
  margin-right: .5rem;
  font-size: large;
  margin-bottom: 1.5rem;
}

.add-routine-add-new-device-button {
  border-radius: 1rem;
  width: 100%;
  max-width: 90rem;
}

.add-routine-cancel-button {
  border-radius: 1rem;
  margin-right: 1.5rem;
  width: 10rem;
  height: 2.5rem;
  border-width: .15rem;
  border-color: grey;
}

.add-routine-confirm-button {
  background-color: rgb(var(--v-theme-blue_state));
  color: white;
  border-radius: 1rem;
  margin-left: 1.5rem;
  width: 10rem;
  height: 2.5rem;
  border-width: .15rem;
  border-color: grey;
}

.add-routine-error{
    display: flex;
    justify-content: center;
    color: rgb(var(--v-theme-red_state));
    text-shadow: .2rem .2rem .4rem rgba(50, 20, 20, 0.6);
    margin-bottom: 1rem;
}

</style>
  