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
    height: 15rem;
    /* Ajusta según tus necesidades */
    width: 100%;
    border: 3px solid;
}
</style>