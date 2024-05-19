<template>
    <v-text-field class="custom-text-field ml-4" hide-details variant="outlined" single-line outlined rounded dense>
        <template v-slot:prepend-inner>
            <v-icon class="custom-icon mr-2 ml-2">mdi-magnify</v-icon>
        </template>
    </v-text-field>
    <v-icon class="custom-icon mr-15 ml-2">mdi-filter</v-icon>
</template>

<style scoped>
.custom-icon {
    color: black;
    font-size: 1.5rem;
}

.custom-text-field {
  max-width: unset;
  min-width: 10rem;
  background-color: rgb(var(--v-theme-primary_v));
  border-radius: 1.5rem;
  height: 3.5rem;
}

.custom-text-field:focus {
  background-color: rgb(var(--v-theme-primary_v));
  box-shadow: none;
}
</style>