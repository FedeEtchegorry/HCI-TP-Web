<template>

    <v-container>

        <v-dialog v-model="showAddDeviceDialog" persistent max-width="600px">
            <v-card class="rounded-xl custom-card">

                <v-card-title class="custom-title">
                <span class="headline">Agregar Nuevo Dispositivo</span>
                </v-card-title>

                <v-card-text>

                    <v-container>
                        <v-form ref="form" v-model="valid">
                            <v-text-field
                                v-model="newDeviceName"
                                class="custom-text-field"
                                label="Nombre del dispositivo"
                                :rules="[v => !!v || 'El nombre es obligatorio']"
                                required
                                rounded
                            ></v-text-field>
                            
                            <v-select
                                v-model="newDeviceType"
                                class="custom-text-field"
                                :items="roomTypes"
                                label="Tipo de dispositivo"
                                :rules="[v => !!v || 'El tipo es obligatorio']"
                                required
                                rounded
                            ></v-select>
                        </v-form>
                    </v-container>

                </v-card-text>

                <v-card-actions>
                    <v-btn class="accept-btn" text @click="addDevice">Agregar</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn class="cancel-btn" text @click="closeDialog">Cancelar</v-btn>
                </v-card-actions>
                
            </v-card>
        </v-dialog>

    </v-container>
  
</template>


<script>

    export default {

        name: 'AddingNewDeviceView',
        data() {

            return {
                showAddDeviceDialog: true,
                newDeviceName: '',
                newDeviceType: '',
                deviceTypes: ['Aspiradora', 'Persiana', 'Heladera', 'Puerta'],
                valid: false,
            };
        },
        methods: {

            toogleDialog() {
                this.showAddDeviceDialog = !this.showAddDeviceDialog;
                this.newDeviceName = '';
                this.newDeviceType = '';
            },
            addDevice() {
                if (this.$refs.form.validate()) {
                    console.log('Nuevo Dispositivo:', this.newDeviceName, 'Tipo:', this.newDeviceType);
                    this.toogleDialog();
                }
            }
        }
    };

</script>
    
  <style>
  
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
  }
  
  </style>
    