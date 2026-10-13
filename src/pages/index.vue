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
      <v-btn color="teal-darken-3" prepend-icon="mdi-paw" to="/pets">Cadastro de Pets</v-btn>
      <v-btn color="teal-darken-3" prepend-icon="mdi-magnify" to="/consulta">Consultar Pets</v-btn>
    </v-card-actions>
  </v-card>
</template>
