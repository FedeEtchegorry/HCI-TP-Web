<template>
    <div class="user-component">
      <v-divider class="divider mb-2"></v-divider>
      <div class="user-container d-flex mb-2">
        <v-icon class="icon">mdi-account</v-icon>
        <p class="name ml-1">{{ name }}</p>
      </div>
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
    background-color: var(--v-theme-primary);
    opacity: 1;
  }
  
  .user-container {
    justify-content: center;
    align-items: center;
    background-color: var(--v-theme-primary);
  }
  
  .icon {
    border-radius: 50%;
    font-size: 3rem;
  }
  
  .name {
    font-size: 1.7rem;
  }
</style>
  