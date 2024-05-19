<template>
    <v-card>
        
        <v-text-field v-model="value" type="Number" >
            <template v-slot:append>
                <v-btn icon @click="value++">
                    <v-icon>mdi-chevron-up</v-icon>
                </v-btn>
            </template>
            <template v-slot:prepend>
                <v-btn icon @click="value--">
                    <v-icon>mdi-chevron-down</v-icon>
                </v-btn>
            </template>
        </v-text-field>
    

        <v-switch :value='status' color="green" inset></v-switch>
    </v-card>

</template>

<script setup>

const value = defineModel('value')
const status = defineModel('status')

</script>

