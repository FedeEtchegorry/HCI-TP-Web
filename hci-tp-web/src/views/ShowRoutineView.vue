<template>
    <v-dialog v-model="props.showRoutine" max-width="60rem">
      <v-card class="rounded-xl show-routine-custom-card">

        <v-card-title class="show-routine-title">
            <v-row class="show-routine-row">
                <v-col cols="auto" class="show-routine-name">
                    <h2> Rutina: {{props.myRoutine.name}} </h2>
                </v-col>
                <v-spacer></v-spacer>
                <v-col cols="auto">
                    <v-card-actions>
                        <v-btn icon="mdi-close" size="40" @click="closeDialog"></v-btn>
                    </v-card-actions>
                </v-col>
            </v-row>
        </v-card-title>

        <div class="show-routine-coarse-divider"></div>

        <v-card-text class="show-routine-devices-section">

            <v-col v-if="props.myRoutine.devices" v-for="(device, index) in props.myRoutine.devices" :key="index">
                <v-row class="show-routine-row">

                    <v-col cols="auto">
                        <span class="show-routine-number-span">{{index+1}}°</span>
                        <span class="show-routine-info-span">Dispositivo: {{device.name}}</span>
                    </v-col>
                    <v-col cols="auto">
                        <span class="show-routine-info-span">Acción: {{device.action}}</span>
                    </v-col>
                    <v-col cols="auto">
                        <span class="show-routine-info-span">Parámetro: {{device.param}}</span>
                    </v-col>
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
    justify-content: space-between;
    align-items: center;
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

.show-routine-number-span {
    margin-top: 1.4rem;
    margin-right: .5rem;
    font-size: large;
}

.show-routine-info-span {
    margin-inline: 1rem;
}

</style>