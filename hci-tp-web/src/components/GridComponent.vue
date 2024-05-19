<template>
  <v-container fluid>
    <v-row dense justify="start" class="grid-container">
      <v-col v-for="(item, index) in items" :key="index" cols="12" sm="6" md="4" lg="3" xl="2">
        <v-card class="fixed-card">
          <v-card-title>{{ item.title }}</v-card-title>
          <v-card-subtitle>{{ item.subtitle }}</v-card-subtitle>
          <v-card-text>{{ item.text }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { title: 'Card 1', subtitle: 'Subtitle 1', text: 'Text 1' },
        { title: 'Card 2', subtitle: 'Subtitle 2', text: 'Text 2' },
        { title: 'Card 1', subtitle: 'Subtitle 1', text: 'Text 1' },
        { title: 'Card 2', subtitle: 'Subtitle 2', text: 'Text 2' },
        { title: 'Card 1', subtitle: 'Subtitle 1', text: 'Text 1' },
        { title: 'Card 2', subtitle: 'Subtitle 2', text: 'Text 2' },
        { title: 'Card 1', subtitle: 'Subtitle 1', text: 'Text 1' },
        { title: 'Card 2', subtitle: 'Subtitle 2', text: 'Text 2' },
        { title: 'Card 1', subtitle: 'Subtitle 1', text: 'Text 1' },


        // Agrega más elementos según necesites
      ]
    };
  },
};
</script>

<style scoped>
.fixed-card {
  height: 15rem;
  /* Ajusta según tus necesidades */
  width: 100%;
  /* Asegura que la tarjeta ocupe todo el ancho disponible en la columna */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  /* Evita overflow del grid */

}

.grid-container {
  overflow: hidden;
  /* Evita overflow del grid */
}
</style>
