<template>
    <v-card class="fixed-card">
        <slot></slot>
    </v-card>
</template>

<style scoped>

.fixed-card {
    user-select: none;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    border: 0.15rem solid;
    border-radius: 15%;
    background-color: rgb(var(--v-theme-primary_v));
}
</style>