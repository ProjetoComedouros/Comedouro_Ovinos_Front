<!-- HomePage.vue -->
<template>
  <div>
    <nav class="navbar navbar-expand bg-white shadow-sm">
      <div class="container">
      <a class="navbar-brand d-flex align-items-center" href="#">
        <img class="logo" src="/images/logo.jpg" alt="LogoNATA" />
      </a>
      <ul class="navbar-nav ms-auto flex-row align-items-center">
        <li class="nav-item me-3"><a class="nav-link" href="#">Home</a></li>
        <li class="nav-item me-3"><a class="nav-link" href="#">Produtos</a></li>
        <li class="nav-item me-3"><a class="nav-link" href="#">Casos</a></li>
        <li class="nav-item me-3"><a class="nav-link" href="#">Suporte</a></li>
        <li class="nav-item"><a class="nav-link btn btn-sm btn-outline-success" href="/Login.html">Área do Cliente</a></li>
      </ul>
    </div>
    </nav>

    <section class="hero-section py-5 text-white" 
  style="background: url('/images/hero-bg.jpg') center/cover no-repeat"
  >
    <div class="hero-content container">
      <h1 class="display-5 fw-bold">Comedouros Automáticos Inteligentes</h1>
      <p class="lead mb-4">Dosagem precisa, economia de ração e monitoramento em tempo real.</p>
      <a href="#produtos" class="btn btn-lg btn-primary">Ver Produtos</a>
    </div>
  </section>

    <section id="produtos" class="py-5">
      <div class="container">
        <div class="row g-4">
          <FeatureCard
            v-for="(f, i) in features"
            :key="i"
            :icon="f.icon"
            :title="f.title"
            :text="f.text"
          />
        </div>
      </div>
    </section>

    <footer class="py-4 text-center">
      <div class="container">
        <p class="mb-1">&copy; 2025 AutoFeederPro.</p>
        <small>Desenvolvido com Vue.js, Bootstrap & CDN.</small>
      </div>
    </footer>
  </div>

</template>






<style>
    :root {
      --color-primary: #20913C;
      --color-dark:    #0F4C22;
      --font-heading:  'Montserrat', sans-serif;
      --font-body:     'Open Sans', sans-serif;
    }
    body {
      font-family: var(--font-body);
      color: #333;
      line-height: 1.6;
    }
    h1,h2,h3,h4,h5,h6 {
      font-family: var(--font-heading);
      color: var(--color-dark);
    }
    a { text-decoration: none; }
   
    .navbar {
      background-color: #fff;
    }
   
    .hero-section {
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

    .feature-card i {
      font-size: 2.5rem;
      color: var(--color-primary);
    } 

    .logo {
      height: 60px; 
      width: auto;
      object-fit: contain;
    }

    footer {
      background: #f8f9fa;
    }
</style>

<script>

import FeatureCard from '@/components/FeatureCard.vue'

export default {
  components: { FeatureCard },
  data() {
    return {
      features: [
        { icon: 'bi-gear-fill', title: 'Alta Precisão', text: 'Controle exato da quantidade de ração para cada animal.' },
        { icon: 'bi-currency-dollar', title: 'Economia', text: 'Redução de até 30% no desperdício de alimento.' },
        { icon: 'bi-wifi', title: 'Conectividade', text: 'Monitoramento remoto via app e alertas em tempo real.' },
      ]
    };
  }
};
</script>