<template>
    <v-btn color="teal-darken-3" :prepend-icon="icone" :to="rota">{{ texto }}</v-btn>
</template>
<script setup>
defineProps({
    icone: String,
    texto: String,
    rota: String
})
</script>
