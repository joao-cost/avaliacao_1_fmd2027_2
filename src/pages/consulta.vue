<template>
    <FiltrosPets v-model="filtros"
        :especies="especies"
        :total="petsFiltrados.length"
        @limpar="limparFiltros" />

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
import FiltrosPets from '@/components/FiltrosPets.vue'
import { carregarPets } from '@/services/storage'

const pets = ref([])

function filtrosVazios() {
    return {
        busca: '',
        especie: null,
        idadeMinima: null,
        idadeMaxima: null,
        somenteCastrados: false,
    }
}

const filtros = ref(filtrosVazios())

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
        if (filtros.value.busca) {
            const texto = filtros.value.busca.toLowerCase()
            const campos = (pet.nome + ' ' + pet.tutor + ' ' + pet.especie + ' ' + pet.cidade).toLowerCase()
            if (!campos.includes(texto)) return false
        }

        if (filtros.value.especie && pet.especie !== filtros.value.especie) return false

        if (filtros.value.idadeMinima != null && pet.idade < Number(filtros.value.idadeMinima)) return false

        if (filtros.value.idadeMaxima != null && pet.idade > Number(filtros.value.idadeMaxima)) return false

        if (filtros.value.somenteCastrados && !pet.castrado) return false

        return true
    })
})

function limparFiltros() {
    filtros.value = filtrosVazios()
}

function formatarData(data) {
    if (!data) return ''
    return data.split('-').reverse().join('/')
}
</script>
