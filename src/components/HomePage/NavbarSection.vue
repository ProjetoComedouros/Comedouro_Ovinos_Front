<template>
  <nav class="navbar navbar-expand bg-white shadow-sm">
    <div class="container">
      <router-link class="navbar-brand d-flex align-items-center" to="/home">
        <img class="logo" src="@/assets/HomeImages/logo.jpg" alt="LogoNATA" />
      </router-link>
      <ul class="navbar-nav ms-auto flex-row align-items-center">
        <li class="nav-item me-3"><router-link class="nav-link" to="#sobre">Sobre</router-link></li>
        <li class="nav-item me-3"><router-link class="nav-link" to="#beneficios">Benefícios</router-link></li>
        <li class="nav-item me-3"><router-link class="nav-link" to="#quem-somos">Quem somos</router-link></li>
        <li class="nav-item me-3"><router-link class="nav-link" to="#footer">Suporte</router-link></li>
        <li class="nav-item"><router-link to="/login" class="nav-link btn btn-sm btn-outline-success">Entrar</router-link></li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
.logo {
  height: 60px;
  width: auto;
  object-fit: contain;
}
</style>