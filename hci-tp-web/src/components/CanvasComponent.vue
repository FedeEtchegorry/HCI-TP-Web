<template>
    <v-app>
        <div class="d-flex flex-column h-100">
            <v-main class="d-flex flex-grow-1">
                <DrawerComponent />
                <v-sheet class="d-flex flex-column flex-grow-1 custom-outer-canvas-div">
                    <v-sheet class="mt-2 mb-4" elevation="0" outlined color="transparent">
                        <TopBar />
                    </v-sheet>
                    <v-card class="ml-4 mr-4 mb-4 rounded-xl custom-inner-canvas-div">
                        <div>
                            <slot></slot>
                        </div>
                    </v-card>
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
.h-100 {
    height: 100%;
}

.custom-outer-canvas-div {
    background-color: rgb(var(--v-theme-secondary));
    display: flex;
    flex-direction: column;
    height: 100vh; /* Adjust the outer canvas to fit within the viewport minus 2rem top and 2rem bottom */
    box-sizing: border-box;
}

.custom-inner-canvas-div {
    background-color: rgb(var(--v-theme-secondary_v));
    overflow-y: auto;
    flex-grow: 1; /* Allow the inner card to grow and fill the remaining space */
}
</style>
