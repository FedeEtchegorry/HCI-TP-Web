<template>
    <EmptyCard>
        <v-card >
            <h2>{{ room.name }}</h2>
            <v-icon :icon="room.meta.icon"></v-icon>
        </v-card>
    </EmptyCard>
</template>

<script setup>
defineProps({
    room: Object,
})
</script>