<template>
    <v-dialog :model-value="aberto" max-width="400" persistent>
        <v-card title="Excluir pet">
            <v-card-text>
                Tem certeza que deseja excluir o pet <strong>{{ nome }}</strong>?
            </v-card-text>
            <v-card-actions>
                <v-btn text="Cancelar" variant="plain" @click="emit('cancelar')"></v-btn>
                <v-spacer></v-spacer>
                <v-btn text="Excluir" color="red" @click="emit('confirmar')"></v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script setup>
defineProps({
    aberto: Boolean,
    nome: String
})
const emit = defineEmits(['confirmar', 'cancelar'])
</script>
