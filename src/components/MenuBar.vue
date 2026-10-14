<template>
    <v-navigation-drawer v-model="drawer" permanent rail expand-on-hover>
        <v-sheet class="pa-4 text-center" color="teal-darken-3">
            <v-icon icon="mdi-paw" size="28" />
        </v-sheet>

        <v-divider></v-divider>

        <v-list>
            <v-list-item v-for="[icon, text, url] in links"
                :key="icon"
                :prepend-icon="icon"
                :title="text"
                :to="url"
                link>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script setup>
import { ref } from 'vue'
const drawer = ref(null)
const links = [
    ['mdi-home', 'Página Inicial', '/'],
    ['mdi-paw', 'Cadastro de Pets', '/pets'],
    ['mdi-magnify', 'Consultar Pets', '/consulta']
]
</script>
