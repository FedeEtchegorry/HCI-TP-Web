<template>
  <v-row class="search-bar">
    <v-text-field v-model="search" label="Buscar" clearable class="custom-text-field" hide-details variant="outlined"
      single-line outlined rounded dense>
      <template v-slot:prepend-inner>
        <v-icon class="custom-icon mr-2 ml-2">mdi-magnify</v-icon>
      </template>
    </v-text-field>

    <v-container class="custom-select">
      <v-select v-model="selected" :items="items" variant="outlined" dense rounded menu-icon="false">
        <template v-slot:prepend-inner>
          <v-icon class="custom-icon mr-2 ml-2">mdi-filter</v-icon>
        </template>
      </v-select>
    </v-container>
  </v-row>
</template>

<script setup>
import { useSearchStore } from '@/stores/searchStore';
import { computed } from 'vue';

const searchStore = useSearchStore();
const search = computed({
  get: () => searchStore.search,
  set: (value) => searchStore.updateSearch(value)
});

const selected = computed({
  get: () => searchStore.getSelected,
  set: (value) => searchStore.updateSelected(value)
});

const items = computed(() => searchStore.getItems);  // Obtener las opciones del v-select desde el store
</script>

<style scoped>
.search-bar {
  min-width: 15rem;
  justify-content: left;
  margin-left: 1rem;
}

.custom-select {
  padding: 0;
  height: 3.5rem;
  width: 4rem;
  margin: 0 1rem
}

::v-deep .custom-icon-append .v-input__append-inner{
display: none;
}

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
  margin: 0;
}

.custom-text-field:focus {
  background-color: rgb(var(--v-theme-secondary));
  box-shadow: none;
}
</style>
