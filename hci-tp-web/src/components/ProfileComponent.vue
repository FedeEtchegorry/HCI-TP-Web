<template>
      <v-divider class="divider mb-2"></v-divider>
      <div class="user-container d-flex mb-2">
        <v-icon class="icon">mdi-account</v-icon>
        <p class="name ml-1">{{ name }}</p>
      </div>
</template>
  
<script>
  export default {
    name: 'UserComponent',
    data() {
      return {
        name: 'Grupo 3',
      };
    },
  };
</script>
  
<style scoped>

  .divider {
    background-color: rgb(var(--v-theme-primary));
    opacity: 1;
  }
  
  .user-container {
    justify-content: center;
    align-items: center;
    background-color: rgb(var(--v-theme-primary));
  }
  
  .icon {
    border-radius: 50%;
    font-size: 3rem;
    background-color: rgb(var(--v-theme-primary_v));
    color: rgb(var(--v-theme-primary));
  }
  
  .name {
    font-size: 1.7rem;
  }
</style>
  