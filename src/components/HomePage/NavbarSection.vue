<template>
  <nav class="navbar navbar-expand bg-white shadow-sm">
    <div class="container">
      <a class="navbar-brand d-flex align-items-center" href="#">
        <img class="logo" src="@/assets/HomeImages/logo.jpg" alt="LogoNATA" />
      </a>
      <ul class="navbar-nav ms-auto flex-row align-items-center">
        <li class="nav-item me-3"><a class="nav-link" href="#">Home</a></li>
        <li class="nav-item me-3"><a class="nav-link" href="#">Produtos</a></li>
        <li class="nav-item me-3"><a class="nav-link" href="#">Casos</a></li>
        <li class="nav-item me-3"><a class="nav-link" href="#">Suporte</a></li>
        <li class="nav-item">
          <a class="nav-link btn btn-sm btn-outline-success" href="/Login.html">Área do Cliente</a>
        </li>
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