<template>
  <v-card class="custom-card" height="4rem" flat>
    <v-toolbar dense flat class="custom-toolbar">
      <v-text-field class="custom-text-field ml-4" hide-details variant="outlined"   single-line outlined rounded>
        <v-icon class="custom-icon mr-2 ml-2">mdi-magnify</v-icon>
      </v-text-field>
      <v-icon class="custom-icon mr-2 ml-2">mdi-filter</v-icon>
      <DropdownHouses class="dropdown mr-5 ml-2"></DropdownHouses>
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

.custom-icon {
  color: black;
  font-size: 2rem;
}

.custom-text-field {
  background-color: rgb(var(--v-theme-primary_v));
  border-radius: 1.5rem; /* Ajustado el valor de los bordes */


}

.custom-text-field:focus {
  background-color: rgb(var(--v-theme-primary_v)); /* Mantener el mismo color de fondo */
  box-shadow: none; /* Eliminar cualquier sombra al enfocar el campo */
}
.dropdown{
  width: 20rem;
  height: 3.5rem;
  font-size: 30rem;
  background-color: rgb(var(--v-theme-secondary_v));
  
}
</style>
