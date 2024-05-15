<template>
  <v-card
    class="custom-card"
    height="4rem"
    flat
  >
    <v-toolbar
      dense
      flat
      class="custom-toolbar"
    >
      <v-icon class="custom-icon">mdi-magnify</v-icon>

      <v-text-field
        class="custom-text-field"
        hide-details
        single-line
        outlined
      />

      <v-icon class="custom-icon">mdi-filter</v-icon>
    </v-toolbar>
  </v-card>
</template>

<style scoped>
.custom-card {
  background-color: transparent; /* Color de fondo de la tarjeta */
  border-radius: 0.5rem; /* Bordes redondeados de la tarjeta */
}

.custom-toolbar {
  background-color: transparent; /* Color de fondo del campo de texto */
  border-radius: 1rem; /* Bordes redondeados del toolbar */
  align-items: center;
  justify-content: space-between;
}

.custom-icon {
  color: black; /* Color del ícono */
  padding: 1.7rem; /* Espaciado alrededor del ícono */
}

.custom-text-field {
  background-color: rgb(var(--v-theme-primary_v)); /* Color de fondo del campo de texto */
  border: none; /* Sin bordes */
  border-radius: 5rem; /* Bordes redondeados */
}
</style>
