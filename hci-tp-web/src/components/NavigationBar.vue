import: 
<template>
  <v-card>
    <v-layout>
      <v-main style="height: 100vh">
        <v-navigation-drawer class="drawer" v-model="drawer" :permanent="true">
          <v-list-item class="drawer_header">CONNECTIT</v-list-item>
          <v-divider :thickness="3" class="divider"></v-divider>
          <v-list>
            <v-list-item v-for="(item, key) in menuItems" :key="key"
              :class="{ 'drawer_elem mr-1 ml-1 mb-1': true, 'selected': currentPage === key }" @click="navigateTo(key)">
              <template v-slot:prepend>
                <v-icon class="icon mr-2">{{ item.icon }}</v-icon> 
                <v-list-item-title class="text ml-2">{{ item.title }}</v-list-item-title>
              </template>
            </v-list-item>
          </v-list>
          <div class="bottom">
            <ProfileComponent></ProfileComponent>
          </div>
        </v-navigation-drawer>
      </v-main>
    </v-layout>
  </v-card>
</template>
<script setup>
import { ref } from 'vue';
import ProfileComponent from './ProfileComponent.vue';
import DropdownHouses from './DropdownHouses.vue';

const drawer = ref(true);
const currentPage = ref('devices');
const menuItems = ref({
  devices: { title: 'DISPOSITIVOS', icon: 'mdi-devices' },
  rooms: { title: 'HABITACIONES', icon: 'mdi-home' },
  routines: { title: 'RUTINAS', icon: 'mdi-calendar-clock' },
  users: { title: 'USUARIOS', icon: 'mdi-account-multiple' },
});

const navigateTo = (page) => {
  if (page!=currentPage.value){
  console.log(`Navigating to ${page}`);
  currentPage.value = page;
  }
};
</script>
<style scoped>
.drawer {
  background: rgb(var(--v-theme-primary));
}

.drawer_header {
  padding-top: 1rem;
  padding-bottom: 0.75rem;
  font-size: 2.4rem;
  color: rgb(var(--v-theme-primary_v));
  text-align: center;
  font-weight: 900;
  font-family:'Lucida Sans Unicode';
}

.divider {
  color: rgb(var(--v-theme-primary_v));
  
  opacity: 1;
}

.drawer_elem {
  background: rgb(var(--v-theme-primary_v));
  color: rgb(var(--v-theme-primary));
  border-radius: 0.5rem !important;
}

.drawer_elem.selected {
  background: rgb(var(--v-theme-blue_state));
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

.bottom {
  width: 100%;
  position: absolute;
  bottom: 0;
  color: rgb(var(--v-theme-primary_v));
  opacity: 1;
}

</style>
