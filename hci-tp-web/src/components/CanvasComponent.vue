<template>
    <v-app>
        <div class="d-flex flex-column h-100">
            <v-main class="d-flex flex-grow-1" :class="props.blurActive === true ? 'custom-blur' : ''">
                <DrawerComponent />
                <v-sheet class="d-flex flex-column flex-grow-1 custom-outer-canvas-div">
                    <v-sheet class="mt-2 mb-4" elevation="0" outlined color="transparent">
                        <TopBar />
                    </v-sheet>
                    <v-card class="ml-4 mr-4 mb-4 rounded-xl custom-inner-canvas-div">
                        <div>
                            <slot></slot>
                        </div>
                        <AddButton class="absolute-bottom-right" @click="addButtonPressed"/>
                    </v-card>
                </v-sheet>
            </v-main>
        </div>
    </v-app>

</template>

<script setup>
import DrawerComponent from './DrawerComponent.vue';
import TopBar from './TopBar.vue';
import AddButton from './AddButton.vue';

const emit = defineEmits(['emitAddButton']);
const addButtonPressed = () => emit('emitAddButton');
const props = defineProps({

    blurActive: {
        type: Boolean,
        required: true
    }
});

</script>

<style scoped>
.h-100 {
    height: 100%;
}

.custom-blur {
    filter:blur(.2rem);
}

.custom-outer-canvas-div {
    background-color: rgb(var(--v-theme-secondary));
    display: flex;
    flex-direction: column;
    height: 100vh;
    box-sizing: border-box;
}

.custom-inner-canvas-div {
    background-color: rgb(var(--v-theme-secondary_v));
    overflow-y: auto;
    flex-grow: 1;
}
.absolute-bottom-right {
  position: fixed;
  bottom: 2rem; 
  right: 1rem; 
}
</style>
