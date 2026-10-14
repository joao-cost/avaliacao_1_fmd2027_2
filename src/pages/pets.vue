<template>
    <v-sheet border rounded>
        <v-data-table :headers="headers" :items="pets">
            <template v-slot:top>
                <v-toolbar>
                    <v-toolbar-title>
                        <v-icon color="medium-emphasis" icon="mdi-paw" size="x-small" start></v-icon>
                        Cadastro de Pets
                    </v-toolbar-title>
                    <v-btn class="me-2" prepend-icon="mdi-plus" rounded="lg" text="Adicionar" border
                        @click="add"></v-btn>
                </v-toolbar>
            </template>

            <template v-slot:item.dataVacina="{ value }">
                {{ formatarData(value) }}
            </template>

            <template v-slot:item.castrado="{ value }">
                {{ value ? 'Sim' : 'Não' }}
            </template>

            <template v-slot:item.actions="{ item }">
                <div class="d-flex ga-2 justify-end">
                    <v-icon color="medium-emphasis" icon="mdi-pencil" size="small" @click="edit(item.id)"></v-icon>

                    <v-icon color="medium-emphasis" icon="mdi-delete" size="small" @click="remove(item.id)"></v-icon>
                </div>
            </template>

            <template v-slot:no-data>
                Nenhum pet cadastrado ainda.
            </template>
        </v-data-table>
    </v-sheet>


    <v-dialog v-model="dialog" max-width="700">
        <v-card>
            <v-card-title class="bg-teal-darken-3">
                {{ isEditing ? 'Atualizar' : 'Adicionar' }} Pet
            </v-card-title>
            <v-card-text>
                <form @submit.prevent="submit">
                    <v-row>
                        <v-col cols="12" sm="6">
                            <v-text-field label="Nome do pet"
                            :error-messages="nome.errorMessage.value"
                            v-model="nome.value.value" />
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field label="Nome do tutor"
                            :error-messages="tutor.errorMessage.value"
                            v-model="tutor.value.value" />
                        </v-col>
                        <v-col cols="12" sm="4">
                            <v-select label="Espécie"
                            :items="especies"
                            :error-messages="especie.errorMessage.value"
                            v-model="especie.value.value" />
                        </v-col>
                        <v-col cols="12" sm="4">
                            <v-number-input label="Idade (anos)" :min="0" :max="30"
                            :error-messages="idade.errorMessage.value"
                            v-model="idade.value.value" />
                        </v-col>
                        <v-col cols="12" sm="4">
                            <v-text-field label="Data da última vacina" type="date"
                            :error-messages="dataVacina.errorMessage.value"
                            v-model="dataVacina.value.value" />
                        </v-col>
                        <v-col cols="12" sm="4">
                            <v-text-field label="CEP do tutor"
                            :error-messages="cep.errorMessage.value"
                            v-model="cep.value.value" />
                        </v-col>
                        <v-col cols="12" sm="5">
                            <v-text-field label="Cidade" :loading="carregandoCep" readonly
                            :error-messages="cidade.errorMessage.value"
                            v-model="cidade.value.value" />
                        </v-col>
                        <v-col cols="12" sm="3">
                            <v-text-field label="UF" :loading="carregandoCep" readonly
                            v-model="uf.value.value" />
                        </v-col>
                        <v-col cols="12">
                            <v-checkbox label="Castrado" v-model="castrado.value.value" />
                        </v-col>
                    </v-row>
                </form>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions class="bg-surface-light">
                <v-btn text="Cancelar" variant="plain" @click="dialog = false"></v-btn>

                <v-spacer></v-spacer>

                <v-btn text="Salvar" @click="submit"></v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <ConfirmarExclusao
        :aberto="dialogExcluir"
        :nome="petExcluir.nome"
        @confirmar="confirmarExclusao"
        @cancelar="dialogExcluir = false" />

    <v-snackbar v-model="snackbar" :color="corMensagem" timeout="3000">
        {{ mensagem }}
    </v-snackbar>
</template>
<script setup>
import { onMounted, ref, shallowRef, computed, watch } from 'vue'
import { useField, useForm } from 'vee-validate'
import axios from 'axios'
import ConfirmarExclusao from '@/components/ConfirmarExclusao.vue'
import { carregarPets, salvarPets } from '@/services/storage'

const { handleSubmit, resetForm, setValues } = useForm({
    validationSchema: {
        nome(value) {
            if (value?.length >= 2) return true

            return 'O nome precisa ter pelo menos 2 letras.'
        },
        tutor(value) {
            if (value?.length >= 3) return true

            return 'Informe o nome do tutor.'
        },
        especie(value) {
            if (value) return true

            return 'Selecione a espécie.'
        },
        idade(value) {
            if (value !== null && value !== '' && value >= 0 && value <= 30) return true

            return 'A idade deve ser entre 0 e 30 anos.'
        },
        dataVacina(value) {
            if (value) return true

            return 'Informe a data da última vacina.'
        },
        cep(value) {
            if (/^[0-9]{5}-?[0-9]{3}$/.test(value)) return true

            return 'CEP inválido. Ex: 78300-000'
        },
        cidade(value) {
            if (value) return true

            return 'Informe um CEP válido para preencher a cidade.'
        },
    },
})

const nome = useField('nome')
const tutor = useField('tutor')
const especie = useField('especie')
const idade = useField('idade')
const dataVacina = useField('dataVacina')
const cep = useField('cep')
const cidade = useField('cidade')
const uf = useField('uf')
const castrado = useField('castrado')

const especies = ['Cachorro', 'Gato', 'Pássaro', 'Roedor', 'Outro']

function createNewRecord() {
    return {
        id: '',
        nome: '',
        tutor: '',
        especie: null,
        idade: null,
        dataVacina: '',
        cep: '',
        cidade: '',
        uf: '',
        castrado: false,
    }
}

const pets = ref([])
const formModel = ref(createNewRecord())
const dialog = shallowRef(false)
const isEditing = computed(() => formModel.value.id !== '');

// exclusão
const dialogExcluir = ref(false)
const petExcluir = ref({})

// mensagens
const snackbar = ref(false)
const mensagem = ref('')
const corMensagem = ref('success')

const carregandoCep = ref(false)

const headers = [
    { title: 'Nome', key: 'nome', align: 'start' },
    { title: 'Tutor', key: 'tutor' },
    { title: 'Espécie', key: 'especie' },
    { title: 'Idade', key: 'idade', align: 'end' },
    { title: 'Última vacina', key: 'dataVacina' },
    { title: 'Castrado', key: 'castrado' },
    { title: 'Cidade', key: 'cidade' },
    { title: 'Ações', key: 'actions', align: 'end', sortable: false },
]

onMounted(() => {
    pets.value = carregarPets()
})

function mostrarMensagem(texto, cor) {
    mensagem.value = texto
    corMensagem.value = cor
    snackbar.value = true
}

// data vem do input como 2026-10-05, mostra como 05/10/2026
function formatarData(data) {
    if (!data) return ''
    return data.split('-').reverse().join('/')
}

// busca a cidade pelo CEP usando o ViaCEP
watch(cep.value, async () => {
    const cepFormatado = String(cep.value.value || '').replace(/\D/g, '');
    if (cepFormatado.length === 8) {
        carregandoCep.value = true
        try {
            const resultado = await axios.get(`https://viacep.com.br/ws/${cepFormatado}/json/`)
            if (resultado.data.erro) {
                cidade.value.value = ''
                uf.value.value = ''
                mostrarMensagem('CEP não encontrado.', 'error')
            } else {
                cidade.value.value = resultado.data.localidade
                uf.value.value = resultado.data.uf
            }
        } catch (erro) {
            cidade.value.value = ''
            uf.value.value = ''
            mostrarMensagem('Erro ao consultar o CEP. Tente novamente.', 'error')
        }
        carregandoCep.value = false
    }
});

function add() {
    formModel.value = createNewRecord()
    resetForm({ values: formModel.value })
    dialog.value = true
}

function edit(id) {
    const found = pets.value.find(pet => pet.id === id)

    formModel.value = { ...found }

    setValues({
        nome: found.nome,
        tutor: found.tutor,
        especie: found.especie,
        idade: found.idade,
        dataVacina: found.dataVacina,
        cep: found.cep,
        cidade: found.cidade,
        uf: found.uf,
        castrado: found.castrado,
    })

    dialog.value = true
}

function remove(id) {
    petExcluir.value = pets.value.find(pet => pet.id === id)
    dialogExcluir.value = true
}

function confirmarExclusao() {
    const index = pets.value.findIndex(pet => pet.id === petExcluir.value.id)
    pets.value.splice(index, 1)
    salvarPets(pets.value)

    dialogExcluir.value = false
    mostrarMensagem('Pet excluído com sucesso!', 'success')
}

const submit = handleSubmit(values => {
    formModel.value.nome = values.nome
    formModel.value.tutor = values.tutor
    formModel.value.especie = values.especie
    formModel.value.idade = Number(values.idade)
    formModel.value.dataVacina = values.dataVacina
    formModel.value.cep = values.cep
    formModel.value.cidade = values.cidade
    formModel.value.uf = values.uf
    formModel.value.castrado = values.castrado

    if (isEditing.value) {
        const index = pets.value.findIndex(pet => pet.id === formModel.value.id)
        pets.value[index] = { ...formModel.value }
        mostrarMensagem('Pet atualizado com sucesso!', 'success')
    } else {
        formModel.value.id = Date.now()
        pets.value.push({ ...formModel.value })
        mostrarMensagem('Pet cadastrado com sucesso!', 'success')
    }

    salvarPets(pets.value)
    dialog.value = false
})
</script>
