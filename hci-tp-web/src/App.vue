<template>
  <v-app>
    <!--Primer Pagina -->
    <div class="d-flex flex-column"> 
    <v-main >
      <div class="d-flex">
        <NavigationBar/>
        <div class="flex-grow-1 custom-canvas-div">
        <div >
          <SearchComponent class=" mt-2 mb-4 ml-2 mr-2 "/>
        </div>
        <div>
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
.custom-canvas-div {
  background-color: rgb(var(--v-theme-secondary));
}
</style>
