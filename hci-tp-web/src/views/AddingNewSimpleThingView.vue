<template>

    <v-container>
        <v-dialog v-model="addOptionActive" @after-leave="emit('newThingEvent', false, '', '')" class="add-thing-dialog">
            <v-card class="rounded-xl add-thing-card">

                <v-card-title class="add-thing-title">
                    <span class="add-thing-headline">{{ headlineName }}</span>
                </v-card-title>

                <v-card-text>

                    <v-container>
                        <v-form ref="form" v-model="valid">
                            <v-text-field
                                v-model="newThingName"
                                class="add-thing-text-field"
                                :label="thingNameLabel"
                                :rules="[v => !!v || 'El nombre es obligatorio', v => (v && v.length <= 15) || 'El nombre no puede tener más de 15 letras']"
                                required
                                rounded 
                                variant="outlined">
                            </v-text-field>

                            <v-select
                                v-model="newThingType"
                                class="add-thing-text-field"
                                :label="thingTypeLabel"
                                :items="thingTypes"
                                :rules="[v => !!v || 'El tipo es obligatorio']"
                                required
                                rounded
                                variant="outlined">
                            </v-select>

                            <v-select v-if="props.extraThingParameter"
                                v-model="newExtraThingParameter"
                                class="add-thing-text-field"
                                :label="extraThingParameter.label"
                                :items="extraThingParameter.options"
                                required
                                rounded
                                variant="outlined">
                            </v-select>
                            <span v-if="errorMessageOn" class="add-thing-error" v-show="props.errorMessageOn">{{ props.errorMsg }}</span>
                        </v-form>
                    </v-container>

                </v-card-text>
                <v-card-actions>
                    <v-btn class="add-thing-accept-button" text @click="addThing">Agregar</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn class="add-thing-cancel-button" text @click="closeDialog">Cancelar</v-btn>
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
let addOptionActive = defineModel('toggle');

const addThing = () => { emit('newThingEvent', true, newThingName.value, newThingType.value, newExtraThingParameter.value); };

const props = defineProps({
    errorMessageOn:{
        type: Boolean,
        required: true
    },
    errorMsg:{
        type: String,
        required:true
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

.add-thing-dialog {
    max-width: 60rem;
    width: 40%;
}
.add-thing-card {
    background-color: rgb(var(--v-theme-primary_v));
    padding-top: 1rem;
    display: flex;
    overflow: hidden;
}

.add-thing-title {
    display: flex;
    justify-content: center;
    text-align: center;
    width: 100%;
}

.add-thing-text-field {
    border: 1rem;
    padding: 1rem;
    color: black;
}

.add-thing-error{
    display: flex;
    justify-content: center;
    color: rgb(var(--v-theme-red_state));
    text-shadow: .2rem .2rem .4rem rgba(50, 20, 20, 0.6);
}

.add-thing-cancel-button {
    border-radius: 1rem;
    margin-right: 1rem;
    margin-bottom: 1rem;
    border-width: .15rem;
    border-color: grey;
}

.add-thing-accept-button {
    background-color: rgb(var(--v-theme-blue_state));
    color: white;
    border-radius: 1rem;
    margin-left: 1rem;
    margin-bottom: 1rem;
    border-width: .15rem;
    border-color: grey;
}

</style>