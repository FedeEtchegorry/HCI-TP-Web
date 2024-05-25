<template>
    <v-dialog v-model="props.addOptionActive" max-width="60rem">
      <v-card class="rounded-xl custom-card">

        <v-card-title class="custom-title-card">
          <v-row class="custom-row" no-gutters>
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
          <div class="custom-divider"></div>
        </v-card-title>

        <v-card-text class="devices-section">
          <v-col v-for="(device, index) in routine.devices" :key="index">

            <v-row class="custom-row" cols="12" sm="6">
              <v-select
                v-model="device.device"
                class="custom-large-field"
                :items="devices"
                label="Device"
                required
                rounded
                variant="outlined"
              ></v-select>
              <v-select
                v-model="device.state"
                class="custom-flexible-field"
                label="Time"
                rounded
                variant="outlined"
              ></v-select>
              <v-select
                v-model="device.state"
                class="custom-flexible-field"
                label="State"
                rounded
                variant="outlined"
              ></v-select>
            </v-row>
            <!-- <v-time-picker></v-time-picker> -->
            <v-row class="custom-row" cols="12" sm="6">

              <v-select
                v-model="device.state"
                class="custom-flexible-field"
                label="Action"
                rounded
                variant="outlined"
              ></v-select>
              <v-text-field
                v-model="device.param1"
                class="custom-flexible-field"
                label="Param1"
                rounded
                variant="outlined"
              ></v-text-field>
              <v-text-field
                v-model="device.param2"
                class="custom-flexible-field"
                label="Param2"
                rounded
                variant="outlined"
              ></v-text-field>
              <v-text-field
                v-model="device.param3"
                class="custom-flexible-field"
                label="Param3"
                rounded
                variant="outlined"
              ></v-text-field>

            </v-row>

            <div class="custom-divider"></div>
          </v-col>

          <v-col cols="12" class="add-new-device-col">
            <v-btn class="add-new-device-button" @click="addDeviceToRoutine">+ Add New Device +</v-btn>
          </v-col>

        </v-card-text>

        <div class="custom-divider"></div>

        <v-card-actions>
          <v-btn class="confirm-button" text @click="saveRoutine">Confirm</v-btn>
          <v-spacer></v-spacer>
          <v-btn class="cancel-button" text @click="closeDialog">Cancel</v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>
</template>
  
<script setup>

import { ref } from 'vue';
import { VTimePicker } from 'vuetify/labs/VTimePicker';

const routine = ref({
  name: '',
  devices: [{ device: '', time: '', state: '', action: '', param1: '', param2: '', param3: ''}],
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

const devicesAvailable = ['Aspiradora', 'Persiana', 'Heladera', 'Puerta', 'Alarma'];
const devicesAvailableStates = ['Activado', 'Desactivado'];
const selectedTime = true;
const timeMenu = true;

const emit = defineEmits(['newRoutineEvent']);
const closeDialog = () => emit('newRoutineEvent', false, '', '');
const newRoutineEvent = () => emit('newRoutineEvent', true, routine);
const addDeviceToRoutine = () => routine.value.devices.push({ device: '', time: '', state: '', action: '', param1: '', param2: '', param3: '' });
const toggleDay = (index) => {
  
  routine.value.days[index].active = !routine.value.days[index].active;
  console.log(`Boton apretado: ${index}, estado: ${routine.value.days[index].active}`);

}

const props = defineProps({
  
  addOptionActive: {
    type: Boolean,
    required: true
  }
});

</script>
  
<style scoped>

.custom-card {
  background-color: rgb(var(--v-theme-primary_v));
  max-height: 60rem;
  padding: 1rem;
}

.custom-large-field {
  margin: .4rem .4rem;
  min-width: 50%;
}

.custom-flexible-field {
  margin: .5rem .4rem;
}

.devices-section {
  max-height: 25rem;
  overflow-y: auto;
}

.day-buttons-col {
  display: flex;
  justify-content: center;
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

.custom-title-card {
  padding-bottom: .5rem;
}

.custom-divider {
  border-top: .1rem solid #000;
  margin-bottom: 1.2rem;
}

.add-new-device-col {
  display: flex;
  justify-content: center;
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
}

.confirm-button {
  background-color: rgb(var(--v-theme-blue_state));
  color: white;
  border-radius: 1rem;
  margin-left: 1.5rem;
  width: 10rem;
  height: 2.5rem;
}

</style>
  