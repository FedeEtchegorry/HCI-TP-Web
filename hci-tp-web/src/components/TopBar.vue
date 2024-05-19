<template>
  <v-card class="custom-card" height="4rem" flat>
    <v-toolbar dense flat class="custom-toolbar">
      <SearchComponent />      
      <DropdownHouses class="custom-dropdown mr-2 ml-2"/>
      <v-icon class="custom-icon-2 mr-5">mdi-pencil</v-icon>
    </v-toolbar>
  </v-card>
</template>

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

.custom-dropdown {
  max-width: 16rem;
  min-width: 10rem;
  height: 3.5rem;
  background-color: rgb(var(--v-theme-primary_v));
  color: black
  
}
</style>
