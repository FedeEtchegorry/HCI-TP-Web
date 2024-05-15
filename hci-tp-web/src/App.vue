<template>
  <v-app>
    <!--Primer Pagina -->
    <div class="d-flex flex-column"> 
    <v-main >
      <div class="d-flex">
        <NavigationBar/>
        <div class="flex-grow-1 custom-outer-canvas-div">
        <div >
          <SearchComponent class="mt-2 mb-4"/>
        </div>
        <div class="d-grid custom-inner-canvas-div">
          <!--CANVA-->
        </div>
      </div>
      </div>
    </v-main>
  </div>
  <!--Segunda Pagina -->
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
.custom-outer-canvas-div {
  background-color: rgb(var(--v-theme-secondary));
}
.custom-inner-canvas-div {
  background-color: rgb(var(--v-theme-secondary-v));
}
</style>
