<template>
  <v-card class="custom-card" height="4rem" flat>
    <v-toolbar dense flat class="custom-toolbar">
      <SearchComponent class="mr-auto"/> 
    </v-toolbar>
  </v-card>
</template>

<style scoped>
.custom-card {
  background-color: transparent;
  border-radius: 0.5rem;
}

.custom-toolbar {
  background-color: transparent;
  border-radius: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}


.custom-icon-2 {
  color: black;
}

.mr-auto {
  margin-right: auto;
}
</style>
