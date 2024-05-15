<template>
  <v-app>
      <!-- Primer Página -->
      <div class="d-flex flex-column vh-100">
        <v-main class="d-flex flex-grow-1">
          <NavigationBar />
          <v-sheet class="d-flex flex-column flex-grow-1 custom-outer-canvas-div">
            <v-sheet class="mt-2 mb-4" elevation="0" outlined color="transparent">
              <SearchComponent />
            </v-sheet>
            <v-sheet class="d-flex flex-grow-1 ml-4 mr-4 mb-4 rounded-xl custom-inner-canvas-div">
              <!-- Contenido adicional aquí -->
            </v-sheet>
          </v-sheet>
        </v-main> 
      </div>
      <!-- Segunda Página -->
      <div>
        <v-main>
        </v-main>
      </div>
  </v-app>
</template>

<script setup>
import NavigationBar from './components/NavigationBar.vue';
import SearchComponent from './components/SearchComponent.vue';

// 
</script>

<style scoped>
.vh-100 {
  height: 100vh;
}

.custom-outer-canvas-div {
  background-color: rgb(var(--v-theme-secondary));
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.custom-inner-canvas-div {
  background-color: rgb(var(--v-theme-secondary_v));
  flex-grow: 1;
  /* Añadir otros estilos según sea necesario */
}
</style>
