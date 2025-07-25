<template>
  <div class="col-md-4 mb-4">
    <div class="card h-100 text-center border-0">
      <img :src="imagem" class="card-img-top rounded-circle mx-auto mt-3" style="width: 150px; height: 150px; object-fit: cover;" alt="Membro da equipe" />
      <div class="card-body">
        <h5 class="card-title">{{ nome }}</h5>
        <p class="card-text">{{ funcao }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    nome: String,
    funcao: String,
    imagem: String
  }
}
</script>