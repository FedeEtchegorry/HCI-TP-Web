<template>
    <CommonListViewComponent @update:addOptionActive="handleAddOptionActive"/>
    <AddingNewDeviceView :addOptionActive="addOptionActive" @update:addOptionActive="setAddOptionActive"/>
</template>


<script setup>
import { ref } from 'vue';
import CommonListViewComponent from '../components/CommonListViewComponent.vue';
import AddingNewDeviceView from '../views/AddingNewDeviceView.vue';

const addOptionActive = ref(false);
const handleAddOptionActive = (value) => {
    setAddOptionActive(value);
};

const setAddOptionActive = (value) => {
  addOptionActive.value = true;
};

</script>