<template>
    <section class="hero-section py-5 text-white">
    <div class="hero-content container">
      <h1 class="display-5 fw-bold">Comedouros Automáticos para Bovinos e Ovinos</h1>
      <p class="lead mb-4">Dosagem precisa, economia de ração e monitoramento em tempo real.</p>
      <router-link to="#beneficios" class="btn btn-lg btn-primary">Conheça os Benefícios</router-link>
    </div>
  </section>
</template>

<style scoped>

.hero-section {
    background: url('@/assets/HomeImages/caprinos.webp') center/cover no-repeat;
    position: relative;
    min-height: 70vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.hero-section::before {
      content: '';
      position: absolute;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.5);
    }
.hero-content {
      position: relative;
      z-index: 1;
      text-align: center;
      color: #fff;
    }
.hero-content .btn-primary {
      background-color: var(--color-primary);
      border-color: var(--color-primary);
    }
.hero-content .btn-primary:hover {
      background-color: var(--color-dark);
      border-color: var(--color-dark);
    }

</style>
