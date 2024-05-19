<template>
    <v-app>
        <div class="d-flex flex-column vh-100">
            <v-main class="d-flex flex-grow-1">
                <DrawerComponent />
                <v-sheet class="d-flex flex-column flex-grow-1 custom-outer-canvas-div">
                    <v-sheet class="mt-2 mb-4" elevation="0" outlined color="transparent">
                        <TopBar />
                    </v-sheet>
                    <v-sheet
                        class="d-flex flex-grow-1 ml-4 mr-4 mb-4 rounded-xl custom-inner-canvas-div overflow-hidden">
                        <slot></slot>
                    </v-sheet>
                </v-sheet>
            </v-main>
        </div>
    </v-app>
</template>

<script setup>
import DrawerComponent from './DrawerComponent.vue';
import TopBar from './TopBar.vue';
</script>

<style scoped>
.vh-100 {
    height: 100vh;
}

.custom-outer-canvas-div {
    background-color: rgb(var(--v-theme-secondary));
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow: hidden;
    /* Evita overflow del contenedor externo */
}

.custom-inner-canvas-div {
    background-color: rgb(var(--v-theme-secondary_v));
    flex-grow: 1;
    overflow: hidden;
    /* Evita overflow del contenedor externo */
}
</style>