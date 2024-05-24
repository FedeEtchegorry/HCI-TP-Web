<!-- src/components/RoutineDialog.vue -->
<template>
    <v-dialog v-model="dialog" max-width="60rem">
      <v-card class="rounded-xl custom-card">

        <v-card-text class="custom-top-text-card">
          <v-row>
              <v-col>
                  <v-text-field
                      v-model="routine.name"
                      class="routine-name-field"
                      label="Routine Name"
                      :rules="[v => !!v || 'El nombre es obligatorio']"
                      required
                      rounded
                      variant="outlined"
                  ></v-text-field>
              </v-col>
              <v-col>
                  <v-btn-toggle v-model="routine.days" multiple>
                      <v-btn class=day-selector-button color="rgb(var(--v-theme-blue_state))" v-for="(day, index) in days" :key="index" @click="toggleDay(day)">
                        {{ day }}
                      </v-btn>
                  </v-btn-toggle>
              </v-col>
          </v-row>
        </v-card-text>

        <div class="custom-divider"></div>

        <v-card-text>

          <v-row v-for="(device, index) in routine.devices" :key="index">
            <v-col cols="12" sm="6">
              <v-autocomplete
                v-model="device.device"
                :items="devices"
                label="Device"
                required
                rounded
                variant="outlined"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" sm="6">
              <v-menu
                ref="menu"
                v-model="device.timeMenu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                min-width="29rem"
                rounded
                variant="outlined"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="device.time"
                    label="Time"
                    prepend-icon="mdi-clock-time-four-outline"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    rounded
                   variant="outlined"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-model="device.time"
                  full-width
                  @click:minute="$refs.menu.save(device.time)"
                ></v-time-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" sm="6">
              <v-select
                v-model="device.state"
                :items="states"
                label="State"
                rounded
                variant="outlined"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="device.param1"
                label="Param1"
                rounded
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="device.param2"
                label="Param2"
                rounded
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="device.param3"
                label="Param3"
                rounded
                variant="outlined"
              ></v-text-field>
            </v-col>
          </v-row>


          <v-col cols="12">
            <v-btn @click="addDevice">+ Add New Device</v-btn>
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
  
<script>

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
  };
</script>
  
<style scoped>

.custom-card {
  background-color: rgb(var(--v-theme-primary_v));
  padding: 1rem;
}

.routine-name-field {
  max-inline-size: 25rem;
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

.custom-top-text-card {
  padding-bottom: .5rem;
}

.custom-divider {
  border-top: .1rem solid #000;
  margin-bottom: 1.2rem;
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
  