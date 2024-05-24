<!-- src/components/RoutineDialog.vue -->
<template>
    <v-dialog v-model="props.addOptionActive" max-width="60rem">
      <v-card class="rounded-xl custom-card">

        <v-card-title class="custom-title-card">
          <v-row>
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
              <v-col cols="12" sm="6">
                  <v-btn-toggle v-model="routine.days" multiple>
                      <v-btn class=day-selector-button color="rgb(var(--v-theme-blue_state))" v-for="(days, index) in daysSelect" :key="index" @click="toggleDay(index)">
                        {{ days.day }}
                      </v-btn>
                  </v-btn-toggle>
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
                :items="states"
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
                :items="states"
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
            <v-btn class="add-new-device-button" @click="addDevice">+ Add New Device +</v-btn>
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
import { VTimePicker } from 'vuetify/labs/VTimePicker'

const emit = defineEmits(['newRoutineEvent']);
const closeDialog = () => emit('newRoutineEvent', false, '', '');
const timeMenu = true;
const selectedTime = true;

const routine = {

  name: '',
  devices: [{ device: '', time: '', state: '', param1: '', param2: '', param3: '', timeMenu: false }],
  days: [],
};

const devicesAvailable = ['Aspiradora', 'Persiana', 'Heladera', 'Puerta', 'Alarma'];
const devicesAvailableStates = ['Activado', 'Desactivado'];
const daysSelect = ref([ 
  
  { day: 'M', active: false },
  { day: 'T', active: false },
  { day: 'W', active: false },
  { day: 'T', active: false },
  { day: 'F', active: false },
  { day: 'S', active: false },
  { day: 'S', active: false }
]);

const props = defineProps({
  
  addOptionActive: {
      type: Boolean,
      required: true
  }
});

/*
  export default {
    data() {
      return {
        dialog: true,
        routine: {
          name: 'Routine 3',
          days: [],
          devices: [
            { device: '', time: '', state: '', param1: '', param2: '', param3: '', timeMenu: false },
          ],
        },
        days: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
        devices: ['Aspiradora', 'Persiana', 'Heladera', 'Puerta', 'Alarma'],
        states: ['On', 'Off', 'Active'],
      };
    },
    methods: {
      closeDialog() {
        this.dialog = false;
      },
      addDevice() {
        this.routine.devices.push({ device: '', time: '', state: '', param1: '', param2: '', param3: '', timeMenu: false });
      },
      removeDevice(index) {
        this.routine.devices.splice(index, 1);
      },
      toggleDay(day) {
        const index = this.routine.days.indexOf(day);
        if (index > -1) {
          this.routine.days.splice(index, 1);
        } else {
          this.routine.days.push(day);
        }
      },
      saveRoutine() {
        // Lógica para guardar la rutina
        console.log(this.routine);
        this.closeDialog();
      },
    },
  };*/
</script>
  
<style scoped>

.custom-card {
  background-color: rgb(var(--v-theme-primary_v));
  max-height: 60rem;
  padding: 1rem;
}

.custom-large-field {
  margin: .5rem .4rem;
  min-width: 50%;
}

.custom-flexible-field {
  margin: .5rem .4rem;
}

.devices-section {
  max-height: 25rem;
  overflow-y: auto;
}

.custom-row {
  display: flex;
  justify-content: space-between;
}
.day-selector-button {

  background-color: lightgray;
  margin-inline: .25rem;
  border-radius: 50%;
  min-width: 3rem;

  border-start-start-radius: 50% !important;
  border-start-end-radius:50% !important;
  border-end-end-radius: 50% !important;
  border-end-start-radius: 50% !important;
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
  