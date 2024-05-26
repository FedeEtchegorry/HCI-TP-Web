<template>
    <v-dialog v-model="props.showRoutine" max-width="60rem">
      <v-card class="rounded-xl custom-card">

        <v-card-title class="custom-title">
            <v-row justify="space-between">
                <v-col cols="auto">
                    <h2 class="left-content"> Rutina: {{props.myRoutine.name}} </h2>
                </v-col>
                <v-col cols="auto">
                    <v-card-actions>
                        <v-btn class="cancel-button" text @click="closeDialog">X</v-btn>
                    </v-card-actions>
                </v-col>
            </v-row>
        </v-card-title>

        <div class="custom-coarse-divider"></div>

        <v-card-text class="devices-section">

            <v-col v-if="props.myRoutine.devices" v-for="(device, index) in props.myRoutine.devices" :key="index">
                <v-row class="custom-row" cols="12" sm="6">

                    <v-col>
                        <span class="device-number-span">{{index+1}}°</span>
                        <span class="device-info-span">Dispositivo: {{device.name}}</span>
                    </v-col>
                    <v-col>
                        <span class="device-info-span">Acción: {{device.action}}</span>
                    </v-col>
                    <v-col>
                        <span class="device-info-span">Parámetro: {{device.param}}</span>
                    </v-col>
                    <div class="custom-thin-divider"></div>
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

.custom-card {
    background-color: rgb(var(--v-theme-primary_v));
    max-height: 50rem;
    max-width: 70rem;
}

.custom-title {
    height: 5rem;
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

.custom-coarse-divider {
    border-bottom: .12rem solid #000;
    margin-inline: .8rem;
    margin-bottom: .5rem;
}

.custom-thin-divider {
    border-top: .07rem solid #000;
    margin-bottom: 1rem;
}

.device-number-span {
    margin-top: 1.4rem;
    margin-right: .5rem;
    font-size: large;
}

.device-info-span {
    margin-inline: 1rem;
}

.cancel-button {
    border-radius: 1rem;
    font-size: x-large;
}

</style>