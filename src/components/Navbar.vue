<template>
  <v-select v-model="selecionado" :options="['Animal 1', 'Animal 2', 'Animal 3']" />
</template>

<script setup>
import { ref } from 'vue'
const selecionado = ref(null)
</script>