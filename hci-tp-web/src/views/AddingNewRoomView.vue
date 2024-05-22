<template>

  <v-container>
    <v-dialog v-model="showAddRoomDialog" persistent max-width="600px">
      <v-card class="rounded-xl custom-card">
        <v-card-title class="custom-title">
          <span class="headline">Agregar Nueva Habitación</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-form ref="form" v-model="valid">
              <v-text-field
                v-model="newRoomName"
                class="custom-text-field"
                label="Nombre de la habitación"
                :rules="[v => !!v || 'El nombre es obligatorio']"
                required
                rounded
                variant="outlined"
              ></v-text-field>
              
              <v-select
                v-model="newRoomType"
                class="custom-text-field"
                :items="roomTypes"
                label="Tipo de habitación"
                :rules="[v => !!v || 'El tipo es obligatorio']"
                required
                rounded
                :menu-props="{ top: false }"
                variant="outlined"
              ></v-select>
            </v-form>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-btn class="accept-btn" text @click="addRoom">Agregar</v-btn>
          <v-spacer></v-spacer>
          <v-btn class="cancel-btn" text @click="closeDialog">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>

</template>
  
<script>

    export default {
      name: 'AddingNewRoomView',
      data() {
          return {
          showAddRoomDialog: true,
          newRoomName: '',
          newRoomType: '',
          roomTypes: ['Living', 'Garage', 'Cuarto', 'Cocina', 'Baño', 'Patio'],
          valid: false,
          };
      },
      methods: {
        closeDialog() {
          this.showAddRoomDialog = false;
          this.newRoomName = '';
          this.newRoomType = '';
        },
        addRoom() {
          if (this.$refs.form.validate()) {
              console.log('Nueva habitación:', this.newRoomName, 'Tipo:', this.newRoomType);
              this.closeDialog();
          }
        }
      }
};

</script>
  
<style>
/*
.custom-card {

  background-color: rgb(var(--v-theme-secondary_v));
}
.custom-title {
  display: flex;
  justify-content: center;
  text-align: center;
  width: 100%;
}

.custom-text-field {
  border-radius: 1rem;
  border: 1rem solid #ddd;
  padding: 1rem;
}

.cancel-btn {
  border-radius: 2rem;
  margin: 1rem;
  padding: auto;
}

.accept-btn {
  background-color: rgb(var(--v-theme-primary));
  color: white;
  border-radius: 2rem;
  margin: 1rem;
  padding: auto;
}*/

</style>
  