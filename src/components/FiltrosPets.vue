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
                        :model-value="modelValue.busca"
                        @update:model-value="atualizar('busca', $event)" clearable />
                </v-col>
                <v-col cols="12" sm="4">
                    <v-select label="Espécie" :items="especies"
                        :model-value="modelValue.especie"
                        @update:model-value="atualizar('especie', $event)" clearable />
                </v-col>
                <v-col cols="6" sm="2">
                    <v-number-input label="Idade mínima" :min="0"
                        :model-value="modelValue.idadeMinima"
                        @update:model-value="atualizar('idadeMinima', $event)" clearable />
                </v-col>
                <v-col cols="6" sm="2">
                    <v-number-input label="Idade máxima" :min="0"
                        :model-value="modelValue.idadeMaxima"
                        @update:model-value="atualizar('idadeMaxima', $event)" clearable />
                </v-col>
                <v-col cols="12" sm="4">
                    <v-switch label="Somente castrados" color="teal-darken-3"
                        :model-value="modelValue.somenteCastrados"
                        @update:model-value="atualizar('somenteCastrados', $event)" />
                </v-col>
            </v-row>
        </v-card-text>
        <v-card-actions>
            <span class="ms-2">{{ total }} pet(s) encontrado(s)</span>
            <v-spacer></v-spacer>
            <v-btn prepend-icon="mdi-filter-remove" @click="emit('limpar')">Limpar filtros</v-btn>
        </v-card-actions>
    </v-card>
</template>
<script setup>
const props = defineProps({
    modelValue: Object,
    especies: Array,
    total: Number
})
const emit = defineEmits(['update:modelValue', 'limpar'])

// devolve para a página os filtros com o campo alterado
function atualizar(campo, valor) {
    emit('update:modelValue', { ...props.modelValue, [campo]: valor })
}
</script>
