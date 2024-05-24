<template>
    <CanvasComponent>
        <AddingNewRoutineView/>
        <h1 class="title">RUTINAS</h1>
    </CanvasComponent>
</template>


<script setup>

import CanvasComponent from '@/components/CanvasComponent.vue';
import AddingNewRoutineView from './AddingNewRoutineView';

</script>

<style scoped>
.title {
  text-align: center;
  margin: 1rem 0;
  font-size: 2.5rem;
  color: rgb(var(--v-theme-primary));
}
</style>