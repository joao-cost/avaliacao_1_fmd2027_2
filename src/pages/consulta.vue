<template>
    <v-card class="mb-4">
        <v-card-title>
            <v-icon icon="mdi-magnify" size="x-small" start></v-icon>
            Consultar Pets
        </v-card-title>
        <v-card-text>
            <v-row>
                <v-col cols="12">
                    <v-text-field label="Buscar (nome, tutor, espécie ou cidade)"
                        prepend-inner-icon="mdi-magnify"
                        v-model="busca" clearable />
                </v-col>
                <v-col cols="12" sm="4">
                    <v-select label="Espécie" :items="especies" v-model="filtroEspecie" clearable />
                </v-col>
                <v-col cols="6" sm="2">
                    <v-number-input label="Idade mínima" :min="0" v-model="idadeMinima" clearable />
                </v-col>
                <v-col cols="6" sm="2">
                    <v-number-input label="Idade máxima" :min="0" v-model="idadeMaxima" clearable />
                </v-col>
                <v-col cols="12" sm="4">
                    <v-switch label="Somente castrados" color="teal-darken-3" v-model="somenteCastrados" />
                </v-col>
            </v-row>
        </v-card-text>
        <v-card-actions>
            <span class="ms-2">{{ petsFiltrados.length }} pet(s) encontrado(s)</span>
            <v-spacer></v-spacer>
            <v-btn prepend-icon="mdi-filter-remove" @click="limparFiltros">Limpar filtros</v-btn>
        </v-card-actions>
    </v-card>

    <v-sheet border rounded>
        <v-data-table :headers="headers" :items="petsFiltrados">
            <template v-slot:item.dataVacina="{ value }">
                {{ formatarData(value) }}
            </template>

            <template v-slot:item.castrado="{ value }">
                <v-chip :color="value ? 'green' : 'grey'" size="small">
                    {{ value ? 'Sim' : 'Não' }}
                </v-chip>
            </template>

            <template v-slot:no-data>
                Nenhum pet encontrado com esses filtros.
            </template>
        </v-data-table>
    </v-sheet>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import { carregarPets } from '@/services/storage'

const pets = ref([])

// filtros
const busca = ref('')
const filtroEspecie = ref(null)
const idadeMinima = ref(null)
const idadeMaxima = ref(null)
const somenteCastrados = ref(false)

const especies = ['Cachorro', 'Gato', 'Pássaro', 'Roedor', 'Outro']

const headers = [
    { title: 'Nome', key: 'nome', align: 'start' },
    { title: 'Tutor', key: 'tutor' },
    { title: 'Espécie', key: 'especie' },
    { title: 'Idade', key: 'idade', align: 'end' },
    { title: 'Última vacina', key: 'dataVacina' },
    { title: 'Castrado', key: 'castrado' },
    { title: 'CEP', key: 'cep' },
    { title: 'Cidade', key: 'cidade' },
    { title: 'UF', key: 'uf' },
]

onMounted(() => {
    pets.value = carregarPets()
})

const petsFiltrados = computed(() => {
    return pets.value.filter(pet => {
        // busca geral sem diferenciar maiúscula e minúscula
        if (busca.value) {
            const texto = busca.value.toLowerCase()
            const campos = (pet.nome + ' ' + pet.tutor + ' ' + pet.especie + ' ' + pet.cidade).toLowerCase()
            if (!campos.includes(texto)) return false
        }

        if (filtroEspecie.value && pet.especie !== filtroEspecie.value) return false

        if (idadeMinima.value != null && pet.idade < Number(idadeMinima.value)) return false

        if (idadeMaxima.value != null && pet.idade > Number(idadeMaxima.value)) return false

        if (somenteCastrados.value && !pet.castrado) return false

        return true
    })
})

function limparFiltros() {
    busca.value = ''
    filtroEspecie.value = null
    idadeMinima.value = null
    idadeMaxima.value = null
    somenteCastrados.value = false
}

function formatarData(data) {
    if (!data) return ''
    return data.split('-').reverse().join('/')
}
</script>
