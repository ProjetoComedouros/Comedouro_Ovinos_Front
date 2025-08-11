<template>
  <div class="sidebar">
    <router-link to="/report" class="fw-bold">Relatórios</router-link>
    <router-link to="/animalregister">Cadastrar Ovelha</router-link>
    <router-link to="#">Perfis de Usuários</router-link>
  </div>
</template>

<script setup>

</script>

<style scoped>
.sidebar {
  width: 220px;
  height: 100vh;
  position: fixed;
  top: 56px;
  left: 0;
  background-color: var(--fundo-claro);
  padding-top: 1rem;
  border-right: 1px solid #ddd;
}
.sidebar a {
  padding: 0.75rem 1.25rem;
  display: block;
  color: var(--texto-cinza);
  text-decoration: none;
}
.sidebar a:hover {
  background-color: #e9ecef;
}
</style>
