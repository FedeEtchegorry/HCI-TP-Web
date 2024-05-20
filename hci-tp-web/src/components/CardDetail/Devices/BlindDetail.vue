<template>
    <v-card width="20rem">
        <v-slider v-model="openPercentage" class="range-set" :step="1" thumb-label @update:model-value="increment" :min="-1" :max="100" >
            <template v-slot:append>
                <v-btn class="value-setter" icon @click="increment">
                    <v-icon >mdi-chevron-up</v-icon>
                </v-btn>
            </template>
            <template  v-slot:prepend>
                <v-btn  class="value-setter" icon @click="decrement">
                    <v-icon >mdi-chevron-down</v-icon>
                </v-btn>
            </template>
        </v-slider>

        <v-switch  :class="openPercentage >= 100 ? 'switch' : 'no-switch'" v-model="status" inset></v-switch>
    </v-card>
</template>

<script setup>
import { ref, computed } from 'vue';

const openValue = ref(0);
const status = ref(false);

const openPercentage = computed({
    get() {
        return openValue.value;
    },
    set(newValue) {
        openValue.value = newValue;
    }
});

function increment() {
    if (openValue.value < 100) {
        openValue.value++;
    }
    console.log(`Closed ${openPercentage.value}%`);
}

function decrement() {
    if (openValue.value > 0) {
        openValue.value--;
    }
    console.log(`Closed ${openPercentage.value}%`);
}
</script>

<style scoped>

.range-set{
    background-color: rgb(var(--v-theme-primary_v));
    color: rgb(var(--v-theme-primary_v));
    accent-color: rgb(var(--v-theme-blue_state));
}

.value-setter{
    background-color: rgb(var(--v-theme-primary));
    color: rgb(var(--v-theme-primary_v));

}
.switch {
    justify-self: center;
    color: rgb(var(--v-theme-primary));
}
.no-switch {
    justify-self: center;
    color: grey;
}
</style>
