<template>
    <v-dialog v-model="props.showRoutine" max-width="60rem">
      <v-card class="rounded-xl show-routine-custom-card">

        <v-card-title class="show-routine-title">
            <v-row justify="space-between">
                <v-col>
                    <h2> Rutina: {{props.myRoutine.name}} </h2>
                </v-col>
                <v-col>
                    <v-card-actions>
                        <v-btn class="show-routine-cancel-button" text @click="closeDialog">X</v-btn>
                    </v-card-actions>
                </v-col>
            </v-row>
        </v-card-title>

        <div class="show-routine-coarse-divider"></div>

        <v-card-text class="show-routine-devices-section">

            <v-col v-if="props.myRoutine.devices" v-for="(device, index) in props.myRoutine.devices" :key="index">
                <v-row class="show-routine-row" cols="12" sm="6">

                    <v-col>
                        <span class="show-routine-number-span">{{index+1}}°</span>
                        <span class="show-routine-info-span">Dispositivo: {{device.name}}</span>
                    </v-col>
                    <v-col>
                        <span class="show-routine-info-span">Acción: {{device.action}}</span>
                    </v-col>
                    <v-col>
                        <span class="show-routine-info-span">Parámetro: {{device.param}}</span>
                    </v-col>
                    <div class="show-routine-thin-divider"></div>
                </v-row>
            </v-col>

        </v-card-text>
      </v-card>
    </v-dialog>
</template>

<script setup>

import { ref } from 'vue';

const emit = defineEmits(['showRoutineEvent']);
const closeDialog = () => emit('showRoutineEvent', false);

const props = defineProps({

  showRoutine: {
    type: Boolean,
    required: true
  },
  myRoutine: {
    type: Object,
    required: true
  }
});

</script>

<style>

.show-routine-card {
    background-color: rgb(var(--v-theme-primary_v));
    max-height: 50rem;
    max-width: 70rem;
}

.show-routine-title {
    height: 5rem;
}
.show-routine-row {
    display: flex;
    justify-content: center;
    justify-self: center;
    justify-items: center;
}

.show-routine-devices-section {
    max-height: 25rem;
    overflow-y: auto;
}

.show-routine-coarse-divider {
    border-bottom: .12rem solid #000;
    margin-inline: .8rem;
    margin-bottom: .5rem;
}

.show-routine-thin-divider {
    border-top: .07rem solid #000;
    margin-bottom: 1rem;
}

.show-routine-number-span {
    margin-top: 1.4rem;
    margin-right: .5rem;
    font-size: large;
}

.show-routine-info-span {
    margin-inline: 1rem;
}

.show-routine-cancel-button {
    border-radius: 1rem;
    font-size: x-large;
}

</style>