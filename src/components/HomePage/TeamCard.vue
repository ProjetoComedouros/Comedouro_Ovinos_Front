<template>
  <div class="card h-100 border-0 shadow-sm">
    <img :src="imagem" class="card-img-top" :alt="nome">
    <div class="card-body">
      <h5 class="card-title">{{ nome }}</h5>
      <p class="text-muted">{{ funcao }}</p>
      <p class="card-text text-muted small">Saiba Mais</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    nome: { type: String, required: true },
    funcao: { type: String, required: true },
    imagem: { type: String, required: true }
  }
}
</script>