<template>

    <v-container>
        <v-dialog v-model="props.addOptionActive" max-width="60rem">
            <v-card class="rounded-xl custom-card">

                <v-card-title class="custom-title">
                    <span class="headline">{{ headlineName }}</span>
                </v-card-title>

                <v-card-text>

                    <v-container>
                        <v-form ref="form" v-model="valid">
                            <v-text-field
                                v-model="newThingName"
                                class="custom-text-field"
                                :label="thingNameLabel"
                                :rules="[v => !!v || 'El nombre es obligatorio', v => (v && v.length <= 12) || 'El nombre no puede tener más de 12 letras']"
                                required
                                rounded 
                                variant="outlined">
                            </v-text-field>

                            <v-select
                                v-model="newThingType"
                                class="custom-text-field"
                                :label="thingTypeLabel"
                                :items="thingTypes"
                                :rules="[v => !!v || 'El tipo es obligatorio']"
                                required
                                rounded
                                variant="outlined">
                            </v-select>

                            <v-select v-if="props.extraThingParameter"
                                v-model="newExtraThingParameter"
                                class="custom-text-field"
                                :label="extraThingParameter.label"
                                :items="extraThingParameter.options"
                                rounded
                                variant="outlined">
                            </v-select>

                        </v-form>
                    </v-container>

                </v-card-text>

                <v-card-actions>
                    <v-btn class="accept-button" text @click="addThing">Agregar</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn class="cancel-button" text @click="closeDialog">Cancelar</v-btn>
                </v-card-actions>
            </v-card>

        </v-dialog>
    </v-container>

</template>

<script setup>

import { ref } from 'vue';

const valid = ref(false);
const newThingName = ref('');
const newThingType = ref('');
const newExtraThingParameter = ref('');
const emit = defineEmits(['newThingEvent']);
const closeDialog = () => emit('newThingEvent', false, '', '');

const addThing = () => {
    emit('newThingEvent', true, newThingName.value, newThingType.value, newExtraThingParameter.value);
    newThingName.value = '';
    newThingType.value = '';
    newExtraThingParameter.value = '';
}

const props = defineProps({

    addOptionActive: {
        type: Boolean,
        required: true
    },
    headlineName: {
        type: String,
        required: true
    },
    thingNameLabel: {
        type: String,
        required: true
    },
    thingTypeLabel: {
        type: String,
        required: true
    },
    thingTypes: {
        type: Array,
        required: true
    },
    extraThingParameter: {

        required: false,
        label: {
            type: String,
        },
        options: {
            type: Array,
        }
    }
});

</script>

<style scoped>

.v-dialog {
    width: 40%;
    display: flex;
    overflow: hidden;
}

.custom-card {
    background-color: rgb(var(--v-theme-primary_v));
    padding-top: 1rem;
    display: flex;
    overflow: hidden;
}

.custom-title {
    display: flex;
    justify-content: center;
    text-align: center;
    width: 100%;
}

.custom-text-field {
    border: 1rem;
    padding: 1rem;
    color: black;
}

.cancel-button {
    border-radius: 1rem;
    margin-right: 1rem;
    margin-bottom: 1rem;
    border-width: .15rem;
    border-color: grey;
}

.accept-button {
    background-color: rgb(var(--v-theme-blue_state));
    color: white;
    border-radius: 1rem;
    margin-left: 1rem;
    margin-bottom: 1rem;
    border-width: .15rem;
    border-color: grey;
}

</style>