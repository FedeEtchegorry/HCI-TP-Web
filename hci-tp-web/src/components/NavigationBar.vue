<template>
  <v-card>
    <v-layout>
      <v-main style="height: 100vh">
        <v-navigation-drawer class="drawer" v-model="drawer" :permanent="true">
          <v-list-item class="drawer_header">CONNECTIT</v-list-item>
          <v-divider class="divider"></v-divider>
          <v-list>
            <v-list-item v-for="(item, key) in menuItems" :key="key"
              :class="{ 'drawer_elem': true, 'selected': currentPage === key }" @click="navigateTo(key)">
              <template v-slot:prepend>
                <v-icon class="icon mr-2">{{ item.icon }}</v-icon> <!-- Added margin-right for spacing -->
                <v-list-item-title class="text">{{ item.title }}</v-list-item-title>
              </template>
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
      drawer: true,
      currentPage: 'devices',
      menuItems: {
        'devices': { title: 'DISPOSITIVOS', icon: 'mdi-devices' },
        'rooms': { title: 'HABITACIONES', icon: 'mdi-home' },
        'routines': { title: 'RUTINAS', icon: 'mdi-calendar-clock' },
        'users': { title: 'USUARIOS', icon: 'mdi-account-multiple' }
      }
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
  color: rgb(var(--v-theme-primary_v));
  opacity: 1;
}

.drawer_elem {
  margin-left: 0.1rem;
  margin-right: 0.1rem;
  background: rgb(var(--v-theme-primary_v));
  justify-content: center;
  color: rgb(var(--v-theme-primary));
  align-items: center;
  margin-bottom: 0.1rem;
  border-radius: 0.5rem !important;
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

.drawer_elem .text {
  font-size: 1.3rem;
  color: rgb(var(--v-theme-primary));
  font-weight: 500;
}

.drawer_elem .icon {
  font-size: 2rem;
  color: rgb(var(--v-theme-primary));
  opacity: 1;
}

.icons_bottom {
  position: absolute;
  bottom: 0;
  font-size: 2rem;
  color: rgb(var(--v-theme-primary_v));
  opacity: 1;
  width: 100%;
}
</style>
