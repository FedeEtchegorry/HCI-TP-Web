<template>
    <v-card class="fixed-card">
        <slot></slot>
    </v-card>
</template>

<script setup>
const status = defineModel('status');
</script>

<style scoped>

.fixed-card {
    height: 100%;
    width: 100%;
    border: 3px solid;
    background-color: rgb(var(--v-theme-primary_v));
}
</style>