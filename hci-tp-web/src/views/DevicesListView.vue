<template>
    <CommonListViewComponent @emitAddButton="handleAddButtonPressed"/>
    <AddingNewDeviceView :addOptionActive="addButtonState" @newDeviceEvent="handleNewDevice"/>
</template>


<script setup>
import { ref } from 'vue';
import CommonListViewComponent from '../components/CommonListViewComponent.vue';
import AddingNewDeviceView from '../views/AddingNewDeviceView.vue';

const addButtonState = ref(false);
const handleAddButtonPressed = () => { addButtonState.value = !addButtonState.value; };
const handleNewDevice = (state) => { addButtonState.value = state; }; // Temporall

</script>