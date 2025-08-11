<template>
  <router-link :to="`/animal?id=${animal.id}`" class="text-decoration-none text-dark">
    <div class="row mb-2 border rounded py-2 px-1 hover-shadow">
      <div class="col-md-1">{{ animal.nome }}</div>
      <div class="col-md-1">{{ animal.digestivo }}</div>
      <div class="col-md-1">{{ animal.desempenho }}</div>
      <div class="col-md-1">{{ animal.viabilidade }}</div>

      <div class="col-12">
        <AnimalChart
          :digestivo="animal.digestivo"
          :desempenho="animal.desempenho"
          :viabilidade="animal.viabilidade"
        />
      </div>
    </div>
  </router-link>
</template>

<script setup>
import AnimalChart from './AnimalChart.vue'
// eslint-disable-next-line
defineProps({
  animal: Object
})
</script>

<style scoped></style>

