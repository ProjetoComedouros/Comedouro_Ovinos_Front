<template>
  <router-link :to="`/animal?id=${animal.id}`" class="text-decoration-none text-dark">
    <div class="row mb-2 border rounded py-2 px-1 hover-shadow">
      <div class="col-md">{{ animal.nome }}</div>
      <div class="col-md">{{ animal.digestivo }}</div>
      <div class="col-md">{{ animal.desempenho }}</div>
      <div class="col-md">{{ animal.viabilidade }}</div>

    </div>
  </router-link>
</template>

<script setup>

// eslint-disable-next-line
defineProps({
  animal: Object
})
</script>

<style scoped></style>
