<template>
  <v-navigation-drawer
    v-model="drawer"
    :rail="isMini"
    permanent
    :class="{ 'mini-mode': isMini }"
    :rail-width="80"
    class="drawer"
  >
    <v-layout class="d-flex drawer-header">
      <v-app-bar-nav-icon @click="toggleMini" class="ham-button"></v-app-bar-nav-icon>
      <v-img :src="profileImage" class="logo-image" v-if="!isMini"></v-img>
    </v-layout>
    <v-divider :thickness="3" class="divider"></v-divider>
    <v-list>
      <v-list-item
        v-for="(item, key) in menuItems"
        :key="key"
        :class="['d-flex drawer_elem mr-1 mb-1 ml-1' , { selected: currentPage === key }]"
        @click="navigateTo(key)"
      >
        <template v-slot:prepend v-if="!isMini">
          <v-icon class="icon">{{ item.icon }}</v-icon>
          <v-list-item-title v-if="!isMini" class="text">{{ item.title }}</v-list-item-title>
        </template>
        <template v-if="isMini">
          <v-icon class="icon">{{ item.icon }}</v-icon>
        </template>
      </v-list-item>
    </v-list>
    <div class="bottom">
      <ProfileComponent v-if="!isMini"></ProfileComponent>
      <v-icon class="icon-account" v-if="mini">mdi-account</v-icon>
    </div>  
  </v-navigation-drawer>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import ProfileComponent from './ProfileComponent.vue';
import profileImage from '../assets/connectit.png';

const drawer = ref(true);
const mini = ref(false);
const currentPage = ref('devices');
const menuItems = ref({
  devices: { title: 'DISPOSITIVOS', icon: 'mdi-devices' },
  rooms: { title: 'HABITACIONES', icon: 'mdi-home' },
  routines: { title: 'RUTINAS', icon: 'mdi-calendar-clock' },
  users: { title: 'USUARIOS', icon: 'mdi-account-multiple' },
});

const isMini = computed( () => {
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
  font-size: 1.5rem;
  border-radius: 50%;
  margin-top: 1rem;
}

.mini-mode .ham-button {
  justify-content: center;
  font-size: 1.5rem;
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
  background: rgb(var(--v-theme-primary_v));
  color: rgb(var(--v-theme-primary));
  border-radius: 0.5rem !important;
}

.drawer_elem.selected {
  background: rgb(var(--v-theme-blue_state));
}

.drawer_elem.selected .icon {
  color: rgb(var(--v-theme-primary_v));
  font-size: 2.2rem;
}

.drawer_elem.selected .text {
  color: rgb(var(--v-theme-primary_v));
  font-weight: 900;
}

.drawer_elem .text {
  font-size: 1.3rem;
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

.mini-mode .icon {
  font-size: 2.2rem;
}

.mini-mode .drawer_elem.selected .icon {
  font-size: 2.4rem;
  justify-self:right;
}
.mini-mode .drawer_elem .icon {
  margin-right: 0;
  font-size: 2.4rem;
}
.icon-account{
  color: rgb(var(--v-theme-primary));
  font-size: 3rem;
  margin-left: 1rem;
  margin-bottom: 0.5rem;
  border-radius: 50%;
  background-color: rgb(var(--v-theme-primary_v));
}
</style>
