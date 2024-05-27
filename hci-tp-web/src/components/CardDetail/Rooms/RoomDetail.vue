<template>
    <EmptyCard class="empty-card">
        <v-card class=card>
            <v-card-title class="title">
                <h2>{{ room.name }}</h2>
            </v-card-title>
            <v-icon class="icon">{{ room.meta.logo }}</v-icon>
            <v-card-subtitle class="subtitle">
                <h2>DISPOSITIVOS</h2>
            </v-card-subtitle>
            <div class="mb-3 devices-qty">
                <h2>{{ qtyDevicesByRoom }}</h2>
            </div>
            <v-card-actions>
                <v-btn color="red" @click.prevent="deleteDialog = true">Eliminar habitacion</v-btn>
            </v-card-actions>
            <v-dialog v-model="deleteDialog" max-width="400">
                <v-card>
                  <v-card-title class="headline">Confirmación de Eliminación</v-card-title>
                  <v-card-text>
                    ¿Estás seguro de que deseas eliminar esta habitacion?
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" text @click="deleteRoom">Eliminar</v-btn>
                    <v-btn color="grey darken-1" text @click="deleteDialog = false">Cancelar</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
        </v-card>
    </EmptyCard>
</template>

<script setup>
import { useRoomStore } from '@/stores/roomStore';
import { ref, onMounted } from 'vue';

const props = defineProps({
    room: Object,
})

const roomStore = useRoomStore();
const deleteDialog=ref(false);
const myRoom = ref(props.room);
let qtyDevicesByRoom = ref(0);

onMounted(async () => {
    const result = await roomStore.getDevicesByRoom(myRoom.value.id);
    qtyDevicesByRoom.value = result.length;
});


async function deleteRoom(){
    try{
        await roomStore.remove(props.room.id);
        window.location.reload()
    }catch(e){
        console.log(e);
    }
}



</script>


<style scoped>
.empty-card {
    background-color: rgb(var(--v-theme-primary_v));
}

.card {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgb(var(--v-theme-primary_v));
    border: none;
    box-shadow: none;
    user-select: none;
}

.title {
    display: flex;
    color: rgb(var(--v-theme-primary));
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    padding: 1rem;
}

.icon {
    font-size: 4rem;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    max-height: 20px;
}

.subtitle {
    padding-top: 2rem;
    color: rgb(var(--v-theme-primary));
    opacity: 0.9;
    margin: 0;
}

.devices-qty {
    color: rgb(var(--v-theme-primary));
    opacity: 0.9;
}

h2 {
    margin: 0;
    padding: 0;
}
</style>
