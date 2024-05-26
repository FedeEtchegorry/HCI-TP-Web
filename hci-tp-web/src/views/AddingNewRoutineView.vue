<template>
    <v-dialog v-model="props.addOptionActive" max-width="60rem">
      <v-card class="rounded-xl custom-card">

        <v-card-title class="custom-title">
          <v-row class="custom-row">
            <v-col cols="12" sm="6">
                <v-text-field
                    v-model="routine.name"
                    class="custom-large-field"
                    label="New Routine Name"
                    :rules="[v => !!v || 'El nombre es obligatorio']"
                    required
                    rounded
                    outlined
                    variant="outlined"
                ></v-text-field>
            </v-col>
            <v-col class="day-buttons-col">
              <v-btn v-for="(day, index) in routine.days" :key="index" :class="day.active === true ? 'day-button day-button-selected' : 'day-button'" @click="toggleDay(index)">
                {{ day.day }}
              </v-btn>
            </v-col>
          </v-row>
        </v-card-title>

        <div class="custom-coarse-divider"></div>
        
        <v-card-text class="devices-section">

          <v-col v-for="(row, index) in routine.devices" :key="index">

            <v-row class="custom-row" cols="12" sm="6">
              <span class="device-number-span">{{index+1}}°</span>
              <v-select
                v-model="row.device"
                @update:model-value="calculatePossibleActions(row.device)"
                class="custom-flexible-field"
                :items="deviceTypes"
                label="Devices"
                required
                rounded
                variant="outlined"
              ></v-select>
              <v-select
                v-model="row.action"
                class="custom-flexible-field"
                :items="possibleActions"
                label="Action"
                rounded
                variant="outlined"
              ></v-select>
              <v-text-field
                v-model="row.param"
                class="custom-flexible-field"
                label="Parameter"
                rounded
                variant="outlined"
              ></v-text-field>
              <v-btn class="delete-device" icon="mdi-delete" size="40" @click="deleteDevice(index)"></v-btn>
            </v-row>

            <div class="custom-thin-divider"></div>

          </v-col>

          <v-col cols="12" class="add-new-device-col">
            <v-btn class="add-new-device-button" @click="addDeviceToRoutine">+ Add New Device +</v-btn>
          </v-col>

        </v-card-text>

        <div class="custom-coarse-divider"></div>

        <v-card-actions>
          <v-btn class="confirm-button" text @click="saveRoutine">Confirm</v-btn>
          <v-spacer></v-spacer>
          <v-btn class="cancel-button" text @click="closeDialog">Cancel</v-btn>
        </v-card-actions>

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

const props = defineProps({
  
  addOptionActive: {
    type: Boolean,
    required: true
  },
  supportedDevices: {  // Devices es un arreglo de los dispositivos soportados que contiene "Tipo" y un arreglo de strings de sus posibles acciones
    required: true,
    type: Array,
    validator(value) { return value.every( item => (typeof(item) === 'object' && typeof(item.type) === 'string' && Array.isArray(item.actions)) ); }
  }
});

const deviceTypes = computed(() => props.supportedDevices.map(device => device.type));
const calculatePossibleActions = (deviceSelected) => {
  const thisDevice = props.supportedDevices.find(dev => dev.type === deviceSelected);
  if (thisDevice) {
    possibleActions.value = thisDevice.actions;
  } else {
    possibleActions.value = [];
  }
};

</script>
  
<style scoped>

.custom-card {
  background-color: rgb(var(--v-theme-primary_v));
  max-height: 60rem;
  padding-bottom: .5rem;
}

.custom-large-field {
  margin-top: 1rem;
  min-width: 50%;
}

.custom-title {
  height: 7rem;
}

.custom-flexible-field {
  margin: .5rem .5rem;
}

.custom-row {
  display: flex;
  justify-content: center;
  justify-self: center;
  justify-items: center;
}

.devices-section {
  max-height: 25rem;
  overflow-y: auto;
}

.day-buttons-col {
  display: flex;
  justify-content: center;
  justify-items: center;
  margin-top: 1rem;
  min-width: 50%;
}

.day-button {
  background-color: lightgray;
  color: black;
  border-radius: 50%;
  min-height: 1.5rem;
  min-width: 1.5rem;
  margin-inline: .4rem;
  box-shadow: 0rem .35rem .2rem rgba(0, 0, 0, 0.4);
}

.day-button-selected {
  background-color: rgb(var(--v-theme-blue_state));
  color: white;
  min-height: 2.25rem;
  box-shadow: inset 0rem .35rem .2rem rgba(0, 0, 0, 0.4);
}

.custom-coarse-divider {
  border-bottom: .12rem solid #000;
  margin-inline: .8rem;
  margin-bottom: .5rem;
}

.custom-thin-divider {
  border-top: .07rem solid #000;
  margin-bottom: 1rem;
}

.add-new-device-col {
  display: flex;
  justify-content: center;
}

.delete-device {
  margin-top: .9rem;
  margin-left: .9rem;
}

.device-number-span {
  margin-top: 1.4rem;
  margin-right: .5rem;
  font-size: large;
}

.add-new-device-button {
  border-radius: 1rem;
  width: 100%;
  max-width: 90rem;
}

.cancel-button {
  border-radius: 1rem;
  margin-right: 1.5rem;
  width: 10rem;
  height: 2.5rem;
  border-width: .15rem;
  border-color: grey;
}

.confirm-button {
  background-color: rgb(var(--v-theme-blue_state));
  color: white;
  border-radius: 1rem;
  margin-left: 1.5rem;
  width: 10rem;
  height: 2.5rem;
  border-width: .15rem;
  border-color: grey;
}

</style>
  