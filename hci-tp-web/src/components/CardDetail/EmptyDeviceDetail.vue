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
}
</style>