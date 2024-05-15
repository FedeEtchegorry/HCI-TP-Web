<template>
  <v-card class="custom-card" height="4rem" flat>
    <v-toolbar dense flat class="custom-toolbar">
      <v-icon class="custom-icon">mdi-magnify</v-icon>
      <v-text-field class="custom-text-field" hide-details single-line outlined></v-text-field>
      <v-icon class="custom-icon">mdi-filter</v-icon>
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
  padding: 0.5rem; /* Reducido el espaciado alrededor del ícono */
}

.custom-text-field {
  background-color: rgb(var(--v-theme-primary_v));
  
  border: none;
  border-radius: 3rem; /* Ajustado el valor de los bordes */
  padding: 0.5rem 1rem; /* Añadido un espacio interno al campo de texto */
}

.custom-text-field:focus {
  background-color: rgb(var(--v-theme-primary_v)); /* Mantener el mismo color de fondo */
  box-shadow: none; /* Eliminar cualquier sombra al enfocar el campo */
}
</style>
