<template>
    <v-card class="fixed-card">
        <slot></slot>
    </v-card>
</template>

<style scoped>

.fixed-card {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    border: 3px solid;
    background-color: rgb(var(--v-theme-primary_v));
}
</style>