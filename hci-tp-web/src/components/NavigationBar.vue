<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer class="drawer" v-model="drawer" permanent="true">
        <v-list-item class="drawer_header">CONNECTIT</v-list-item>

        <v-divider class="divider"></v-divider>

        <v-list nav class="drawer_button">
          <v-list-item class="drawer_elem" :class="{ 'selected': currentPage === 'devices' }" @click="navigateTo('devices')">
            <template v-slot:prepend>
              <v-icon class="icon">mdi-devices</v-icon> 
            </template>
            <v-list-item-title class="text">DEVICES</v-list-item-title> 
          </v-list-item>

          <v-list-item class="drawer_elem" :class="{ 'selected': currentPage === 'rooms' }" @click="navigateTo('rooms')">
            <template v-slot:prepend>
              <v-icon class="icon" >mdi-home</v-icon> 
            </template>
            <v-list-item-title class="text">ROOMS</v-list-item-title> 
          </v-list-item>

          <v-list-item  class="drawer_elem" :class="{ 'selected': currentPage === 'routines' }" @click="navigateTo('routines')">
            <template v-slot:prepend>
              <v-icon class="icon" >mdi-day</v-icon> 
            </template>
            <v-list-item-title class="text">ROUTINES</v-list-item-title> 
          </v-list-item>

          <v-list-item class="drawer_elem"  :class="{ 'selected': currentPage === 'users' }" @click="navigateTo('users')">
            <template v-slot:prepend>
              <v-icon class="icon" >mdi-account-multiple</v-icon> 
            </template>
            <v-list-item-title class="text">USERS</v-list-item-title> 
          </v-list-item>

        </v-list>
      </v-navigation-drawer>
      <v-main style="height: 100vh">
        
      </v-main>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      drawer: true, // initialize drawer state
      currentPage: 'devices' // store the currently selected page
    };
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer; // toggle drawer state
    },
    navigateTo(page) {
      // Perform navigation based on the selected page
      console.log(`Navigating to ${page}`);
      this.currentPage = page; // update the currently selected page
    }
  }
};
</script>

<style scoped>
  .drawer {
    background: rgb(var(--v-theme-primary));
  }
  .drawer_header {
    font-size: 2.5rem;
    color: rgb(var(--v-theme-primary_v));
    text-align: center;
  }
  .divider {
  

    color: rgb(var(--v-theme-primary_v));
    opacity: 1;
  }
  .drawer_button {
    color: rgb(var(--v-theme-tertiary));
  }
  .drawer_elem {
    border-radius: 0.5rem;
    background: rgb(var(--v-theme-primary_v));
    color: rgb(var(--v-theme-primary));
  }
  .drawer_elem.selected {
    background: rgba(var(--v-theme-blue_state)); /* Change background color of selected item */
    color: rgb(var(--v-theme-primary_v)); 
  }
  .drawer_elem.selected .icon{
    color: rgb(var(--v-theme-primary_v)); 
  }
  .drawer_elem.selected .text{
    color: rgb(var(--v-theme-primary_v)); 
  }
  
  /* Scoped styles for the text */
  .drawer_elem .text {
    font-size: 1.2rem; /* Change text font size */
    color: rgb(var(--v-theme-primary));
  }
  /* Scoped styles for the icons */
  .drawer_elem .icon {
    font-size: 1.5rem; /* Change icon font size */
    color: rgb(var(--v-theme-primary));
    opacity: 1;
  }
</style>
