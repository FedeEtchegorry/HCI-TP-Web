<template>
  <v-card class="custom-card" height="4rem" flat>
    <v-toolbar dense flat class="custom-toolbar">
      <v-text-field class="custom-text-field ml-4" hide-details variant="outlined" single-line outlined rounded dense>
        <template v-slot:prepend-inner>
          <v-icon class="custom-icon mr-2 ml-2">mdi-magnify</v-icon>
        </template>
      </v-text-field>
      <v-icon class="custom-icon mr-2 ml-2">mdi-filter</v-icon>
      <DropdownHouses class="custom-dropdown mr-2 ml-2"></DropdownHouses>
      <v-icon class="custom-icon-2 mr-5">mdi-pencil</v-icon>
    </v-toolbar>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      
    };
  },
};
</script>

<style scoped>
.custom-card {
  background-color: transparent;
  border-radius: 0.5rem;
}

.custom-toolbar {
  background-color: transparent;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}


.custom-icon {
  color: black;
  font-size: 1.5rem;
}

.custom-text-field {
  background-color: rgb(var(--v-theme-primary_v));
  border-radius: 1.5rem;
  height: 3.5rem; 
}


.custom-text-field:focus {
  background-color: rgb(var(--v-theme-primary_v));
  box-shadow: none;
}

.custom-dropdown {
  width: 16rem;
  height: 3.5rem;
  background-color: rgb(var(--v-theme-primary_v));
  color: black
  
}
</style>
