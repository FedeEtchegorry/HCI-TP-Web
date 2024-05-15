<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer class="drawer"
        v-model="drawer"
        temporary
      >
        <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/men/78.jpg"
          title="CONNECTIT"
        ></v-list-item>

        <v-divider></v-divider>

        <v-list nav class="drawer_button">
          <v-list-item class="drawer_elem" value="rooms">
            <template v-slot:prepend>
              <v-icon class="icon">mdi-devices</v-icon> 
            </template>
            <v-list-item-title class="text">DEVICES</v-list-item-title> 
          </v-list-item>

          <v-list-item class="drawer_elem" value="rooms">
            <template v-slot:prepend>
              <v-icon class="icon">mdi-home</v-icon> 
            </template>
            <v-list-item-title class="text">ROOMS</v-list-item-title> 
          </v-list-item>

          <v-list-item class="drawer_elem" value="rooms">
            <template v-slot:prepend>
              <v-icon class="icon">mdi-day</v-icon> 
            </template>
            <v-list-item-title class="text">ROUTINES</v-list-item-title> 
          </v-list-item>

          <v-list-item class="drawer_elem" value="rooms">
            <template v-slot:prepend>
              <v-icon class="icon">mdi-account-multiple</v-icon> 
            </template>
            <v-list-item-title class="text">USERS</v-list-item-title> 
          </v-list-item>

        </v-list>
      </v-navigation-drawer>
      <v-main style="height: 100vh">
        <div class="d-flex justify-center align-center h-100">
          <v-btn 
            @click.stop="toggleDrawer">
            Toggle
          </v-btn>
        </div>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      drawer: false // initialize drawer state
    };
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer; // toggle drawer state
    }
  }
};
</script>

<style scoped>
  .drawer{
    background: rgb(var(--v-theme-primary));
  }
  .drawer_button{
    color: rgb(var(--v-theme-tertiary));
  }
  .drawer_elem{
    background: rgb(var(--v-theme-primary_v));
    color: rgb(var(--v-theme-primary));
    
  }
  /* Scoped styles for the text */
  .drawer_elem .text {
    font-size: 20px; /* Change text font size */
  }

  /* Scoped styles for the icons */
  .drawer_elem .icon {
    font-size: 35px; /* Change icon font size */
  }


</style>
