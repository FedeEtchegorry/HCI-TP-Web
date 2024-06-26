<template>
  <v-navigation-drawer v-model="drawer" :rail="isMini" permanent :class="{ 'mini-mode': isMini }" :rail-width="80"
    class="drawer">
    <v-layout class="d-flex drawer-header">
      <v-app-bar-nav-icon @click="toggleMini" aria-label="minimizar" class="ham-button"></v-app-bar-nav-icon>
      <v-img :src="profileImage" alt="CONNECTIT-logo" class="logo-image" v-show="!isMini"></v-img>
    </v-layout>
    <v-divider :thickness="3" class="divider"></v-divider>
        <RouterLink class="d-flex drawer_elem ma-1 pt-2 pb-2 pl-5 pr-5" to="/">
          <v-icon class="icon">mdi-devices</v-icon>
          <h2 v-show="!isMini" class="text">DISPOSITIVOS</h2>
        </RouterLink>
        <RouterLink class="d-flex drawer_elem ma-1 pt-2 pb-2 pl-5 pr-5" to="/rooms">
          <v-icon class="icon">mdi-home</v-icon>
          <h2 v-show="!isMini" class="text">HABITACIONES</h2>
        </RouterLink>
        <RouterLink class="d-flex drawer_elem ma-1 pt-2 pb-2 pl-5 pr-5" to="/routines">
          <v-icon class="icon">mdi-calendar-clock</v-icon>
          <h2 v-show="!isMini" class="text">RUTINAS</h2>
        </RouterLink>   
    <div class="bottom">
      <ProfileComponent v-if="!isMini"></ProfileComponent>
      <v-icon class="icon-account" v-else>mdi-account</v-icon>
    </div>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import ProfileComponent from './ProfileComponent.vue';
import profileImage from '../assets/connectit.webp';

const drawer = ref(true);
const mini = ref(false);
const currentPage = ref('devices');
const menuItems = ref({
  devices: { title: 'DISPOSITIVOS', icon: 'mdi-devices' },
  rooms: { title: 'HABITACIONES', icon: 'mdi-home' },
  routines: { title: 'RUTINAS', icon: 'mdi-calendar-clock' },
  houses: { title: 'HOGARES', icon: 'mdi-home-group' },
});

const isMini = computed(() => {
  return mini.value
})

const toggleMini = () => {
  mini.value = !mini.value;
};

const navigateTo = (page) => {
  if (page !== currentPage.value) {
    console.log(`Navigating to ${page}`);
    currentPage.value = page;
  }
};

const handleResize = () => {
  mini.value = window.innerWidth < 750.5;
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
  handleResize();
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<style scoped>
.drawer {
  background: rgb(var(--v-theme-primary));
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.drawer-header {
  justify-content: space-evenly;
  padding: 0.8rem 0.5rem;
}

.ham-button {
  background: rgb(var(--v-theme-primary_v));
  color: rgb(var(--v-theme-primary));
  border-radius: 50%;
  margin-top: 1rem;
}

.mini-mode .ham-button {
  justify-content: center;
  background: rgb(var(--v-theme-primary_v));
  color: rgb(var(--v-theme-primary));
}

.logo-image {
  margin-left: 0.3rem;
  margin-right: 0.3rem;
  margin-top: 1rem;
}

.divider {
  color: rgb(var(--v-theme-primary_v));
  opacity: 1;
}

.drawer_elem {
  user-select: none;
  background: rgb(var(--v-theme-primary_v));
  color: rgb(var(--v-theme-primary));
  border-radius: 0.5rem;
  text-decoration: none;
}

.router-link-exact-active  {
  background: rgb(var(--v-theme-blue_state));
  text-decoration: none;
}

.router-link-exact-active .icon {
  color: rgb(var(--v-theme-primary_v)) !important;
}

.router-link-exact-active .text {
  color: rgb(var(--v-theme-primary_v)) !important;
  font-weight: 900;
}

.drawer_elem .text {
  color: rgb(var(--v-theme-primary));
  font-weight: 500;
}

.drawer_elem .icon {
  margin-right: 1rem;
  font-size: 2rem;
  color: rgb(var(--v-theme-primary));
  opacity: 1;
}

.mini-mode .drawer_elem {
  color: rgb(var(--v-theme-primary));
  opacity: 1;
}


.mini-mode .icon {
  font-size: 2.2rem;
}

.mini-mode .drawer_elem.selected .icon {
  font-size: 2.4rem;
  justify-self: right;
}

.mini-mode .drawer_elem .icon {
  margin-right: 0;
  font-size: 2.4rem;
}
.bottom {
  width: 100%;
  position: absolute;
  bottom: 0;
  align-items: center;
  color: rgb(var(--v-theme-primary_v));
  opacity: 1;
}

.icon-account {
  color: rgb(var(--v-theme-primary));
  font-size: 3rem;
  margin-left: 1rem;
  margin-bottom: 0.5rem;
  border-radius: 50%;
  background-color: rgb(var(--v-theme-primary_v));
}
</style>
