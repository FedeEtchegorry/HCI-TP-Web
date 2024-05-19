<template>
    <v-card hover class="bg-white mx-auto rounded-xl" max-width="344" max-height="344" variant="outlined">
        <v-card-item>
            <v-card-title>{{ title }}</v-card-title>
            <v-card-subtitle>{{ subtitle }}</v-card-subtitle>
        </v-card-item>

        <v-icon icon="mdi-sofa" size="large"></v-icon>

        <v-card-text>
            {{ message }}
        </v-card-text>

        <v-card-actions>
            <v-btn text="Button"></v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup>
defineProps({
    title: String,
    subtitle: String,
    icon: String,
    message: String,
})
</script>