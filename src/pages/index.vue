<template>
  <v-card class="mx-auto" max-width="700">
    <v-card-title class="bg-teal-darken-3">
      <v-icon icon="mdi-paw" start></v-icon>
      PetShop
    </v-card-title>
    <v-card-text class="pt-4">
      Sistema simples para cadastro dos pets atendidos no pet shop.
      Use o menu ao lado para cadastrar, editar e excluir os pets ou para consultar
      os pets cadastrados usando os filtros.
    </v-card-text>
    <v-card-actions>
      <BotaoAtalho icone="mdi-paw" texto="Cadastro de Pets" rota="/pets" />
      <BotaoAtalho icone="mdi-magnify" texto="Consultar Pets" rota="/consulta" />
    </v-card-actions>
  </v-card>
</template>

<script setup>
import BotaoAtalho from '@/components/BotaoAtalho.vue'
</script>
