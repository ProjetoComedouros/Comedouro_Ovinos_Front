<template>
  <div class="col-md-4 mb-4">
    <div class="card h-100 text-center shadow-sm">
      <img :src="imagem" class="card-img-top" alt="Imagem do produto" />
      <div class="card-body">
        <h5 class="card-title">{{ titulo }}</h5>
        <p class="card-text">{{ descricao }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    titulo: String,
    descricao: String,
    imagem: String
  }
}
</script>
