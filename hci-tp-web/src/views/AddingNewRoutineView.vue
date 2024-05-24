<!-- src/components/RoutineDialog.vue -->
<template>

    <v-dialog v-model="dialog" max-width="60rem">
      <v-card class="custom-card">
        <v-card-text>
          <v-container>

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
                    <v-btn-toggle v-model="routine.days" multiple class="day-selector">
                        <v-btn class=day-selector-button v-for="(day, index) in days" :key="index" @click="toggleDay(day)">
                            {{ day }}
                        </v-btn>
                    </v-btn-toggle>
                </v-col>
            </v-row>

              <v-col v-for="(device, index) in routine.devices" :key="index" cols="12">
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-autocomplete
                      v-model="device.device"
                      :items="devices"
                      label="Device"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-menu
                      ref="menu"
                      v-model="device.timeMenu"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="device.time"
                          label="Time"
                          prepend-icon="mdi-clock-time-four-outline"
                          readonly
                          v-bind="attrs"
                          v-on="on"
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
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="device.param1"
                      label="Param1"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="device.param2"
                      label="Param2"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="device.param3"
                      label="Param3"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-btn color="red" @click="removeDevice(index)">Remove</v-btn>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12">
                <v-btn @click="addDevice">+ Add New Device</v-btn>
              </v-col>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-btn color="blue darken-1" text @click="closeDialog">Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="saveRoutine">Confirm</v-btn>
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
    background-color: rgb(var(--v-theme-secondary_v));
    padding-top: .5rem;
}

.routine-name-field {
    background-color: rgb(var(--v-theme-secondary_v));
    max-inline-size: 25rem;
}

.day-selector-button {
    border-start-start-radius: 50% !important;
    border-start-end-radius:50% !important;
    border-end-end-radius: 50% !important;
    border-end-start-radius: 50% !important;

    margin-inline: .25rem;
    border-radius: 50%;
    min-width: 3rem;
    align-self: auto;
    justify-content: space-between;
}

.cancel-button {
    border-radius: 1rem;
    margin-right: 1rem;
    margin-bottom: 1rem;
}

.accept-button {
    background-color: rgb(var(--v-theme-primary));
    color: white;
    border-radius: 1rem;
    margin-left: 1rem;
    margin-bottom: 1rem;
}

</style>
  