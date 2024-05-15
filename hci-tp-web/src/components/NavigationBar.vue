<template>
  <v-card>
    <v-layout>
      <v-main style="height: 100vh">
        <v-navigation-drawer class="drawer" v-model="drawer" :permanent="true">
          <v-list-item class="drawer_header">CONNECTIT</v-list-item>

          <v-divider class="divider"></v-divider>

          <v-list nav class="drawer_button">
            <v-list-item class="drawer_elem" :class="{ 'selected': currentPage === 'devices' }"
              @click="navigateTo('devices')">
              <template v-slot:prepend>
                <v-icon class="icon">mdi-devices</v-icon>
              </template>
              <v-list-item-title class="text">DISPOSITIVOS</v-list-item-title>
            </v-list-item>

            <v-list-item class="drawer_elem" :class="{ 'selected': currentPage === 'rooms' }"
              @click="navigateTo('rooms')">
              <template v-slot:prepend>
                <v-icon class="icon">mdi-home</v-icon>
              </template>
              <v-list-item-title class="text">HABITACIONES</v-list-item-title>
            </v-list-item>

            <v-list-item class="drawer_elem" :class="{ 'selected': currentPage === 'routines' }"
              @click="navigateTo('routines')">
              <template v-slot:prepend>
                <v-icon class="icon">mdi-calendar-clock</v-icon>
              </template>
              <v-list-item-title class="text">RUTINAS</v-list-item-title>
            </v-list-item>

            <v-list-item class="drawer_elem" :class="{ 'selected': currentPage === 'users' }"
              @click="navigateTo('users')">
              <template v-slot:prepend>
                <v-icon class="icon">mdi-account-multiple</v-icon>
              </template>
              <v-list-item-title class="text">USUARIOS</v-list-item-title>
            </v-list-item>
          </v-list>
          <div class="d-flex justify-space-between icons_bottom">
            <v-icon class="icon_bottom" @click="navigateTo('settings')">mdi-cog</v-icon>
            <v-icon class="icon_bottom" @click="navigateTo('help')">mdi-help-circle-outline</v-icon>
          </div>

        </v-navigation-drawer>


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
  display: flex;
  background: rgb(var(--v-theme-primary));
}

.drawer_header {
  padding-top: 1rem;
  padding-bottom: 0.75rem;
  font-size: 2.5rem;
  color: rgb(var(--v-theme-primary_v));
  text-align: center;
}

.divider {
  padding-bottom: 1rem;
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
  background: rgba(var(--v-theme-blue_state));
}

.drawer_elem.selected .icon {
  color: rgb(var(--v-theme-primary_v));
}

.drawer_elem.selected .text {
  color: rgb(var(--v-theme-primary_v));
}

/* Scoped styles for the text */
.drawer_elem .text {
  padding-top: 1rem;
  padding-bottom: 1rem;
  font-size: 1.3rem;
  /* Change text font size */
  color: rgb(var(--v-theme-primary));
}

/* Scoped styles for the icons */
.drawer_elem .icon {
  margin-left: 30%;
  font-size: 2rem;
  /* Change icon font size */
  color: rgb(var(--v-theme-primary));
  opacity: 1;
}

.icons_bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}

.icon_bottom {
  font-size: 3rem;
  color: rgb(var(--v-theme-primary_v));
  opacity: 1;
}
</style>