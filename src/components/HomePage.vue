<!-- HomePage.vue -->
<template>
  <div>
    <nav class="navbar navbar-expand bg-white shadow-sm">
      <div class="container">
      <a class="navbar-brand d-flex align-items-center" href="#">
        <img class="logo" src="/images/logo.jpg" alt="LogoNATA" />
      </a>
      <ul class="navbar-nav ms-auto flex-row align-items-center">
        <li class="nav-item me-3"><a class="nav-link" href="#sobre">Sobre</a></li>
        <li class="nav-item me-3"><a class="nav-link" href="#beneficios">Benefícios</a></li>
        <li class="nav-item me-3"><a class="nav-link" href="#quem-somos">Quem somos</a></li>
        <li class="nav-item me-3"><a class="nav-link" href="#">Suporte</a></li>
        <li class="nav-item"><a class="nav-link btn btn-sm btn-outline-success" href="/components/login.vue">Área do Cliente</a></li>
      </ul>
    </div>
    </nav>

    <section class="hero-section py-5 text-white" 
  style="background: url('/images/caprinos.webp') center/cover no-repeat"
  >
    <div class="hero-content container">
      <h1 class="display-5 fw-bold">Comedouros Automáticos para Bovinos e Ovinos</h1>
      <p class="lead mb-4">Dosagem precisa, economia de ração e monitoramento em tempo real.</p>
      <a href="#beneficios" class="btn btn-lg btn-primary">Conheça os Benefícios</a>
    </div>
  </section>

  
    
  <br>

  
    <section id="beneficios" class="py-5">
      
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
<br>

    <section id="sobre" class="py-5 como-funciona-section">
  <div class="container">
    <!-- Título + Subheading -->
    <div class="text-center mb-4">
      
      
    </div>
    

    <!-- Cards de benefício -->
    <div class="beneficios row gy-4"> 
      <h2>Sobre</h2>
      <!-- Card 1 -->
      <div class="col-12">
        <div class="card bg-white border-0 shadow-sm">
          <div class="row g-0 align-items-center">
            <div class="col-md-3">
              <img
                src="assets/img/beneficio-1.jpg"
                class="img-fluid rounded-start"
                alt="foto"
              />
            </div>
            <div class="col-md-9">
              <div class="card-body">
                <h5 class="card-title">Problemática</h5>
                <p class="card-text text-muted">
                  A pecuária moderna demanda cada vez mais eficiência e sustentabilidade. 
      Produtores enfrentam desafios diários para balancear custos de ração, garantir o bem-estar 
      animal e ainda obter relatórios confiáveis para tomada de decisão.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Card 2 -->
      <div class="col-12">
        <div class="card bg-white border-0 shadow-sm">
          <div class="row g-0 align-items-center">
            <div class="col-md-3">
              <img
                src="assets/img/beneficio-2.jpg"
                class="img-fluid rounded-start"
                alt="Análise inteligente"
              />
            </div>
            <div class="col-md-9">
              <div class="card-body">
                <h5 class="card-title">Nossa solução</h5>
                <p class="card-text text-muted">
                  Desenvolvemos comedouros automáticos equipados com sensores inteligentes e software de análise, 
      que permitem dosagem precisa, monitoramento remoto e relatórios em tempo real. 
      Tudo isso para que você economize até 30% de ração e tenha dados confiáveis para otimizar seu rebanho.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Card 3 -->
      
    </div>
  </div>
</section>

<section id="quem-somos" class="py-5 quem-somos-section">
  <div class="container">
    <!-- Título + Subheading -->
    <div class="text-center mb-4">
      <h2 class="fw-bold" style="font-family: var(--font-heading);">Quem somos?</h2>
      <p class="text-muted">Conheça a equipe qualificada da Univerisidade Federal de Santa Maria</p>
    </div>
    <!-- Cards de equipe -->
    <div class="row row-cols-1 row-cols-md-3 g-4">
      <!-- Card 1 -->
      <div class="col">
        <div class="card h-100 border-0 shadow-sm">
          <img src="assets/img/team1.jpg" class="card-img-top" alt="Rafael">
          <div class="card-body">
            <h5 class="card-title">Rafael Sanches Venturini</h5>
            <p class="text-muted">Coordenador</p>
            <p class="card-text text-muted small">Saiba Mais</p>
          </div>
        </div>
      </div>
      <!-- Card 2 -->
      <div class="col">
        <div class="card h-100 border-0 shadow-sm">
          <img src="assets/img/team2.jpg" class="card-img-top" alt="Fernando">
          <div class="card-body">
            <h5 class="card-title">Fernando Mariano Bayer</h5>
            <p class="text-muted">Coordenador-adjunto</p>
            <p class="card-text text-muted small">Saiba Mais</p><a href="#"></a>
          </div>
        </div>
      </div>
      <!-- Card 3 -->
       <div class="col">
        <div class="card h-100 border-0 shadow-sm">
          <img src="assets/img/team3.jpg" class="card-img-top" alt="Leandro">
          <div class="card-body">
            <h5 class="card-title">Leandro Roggia</h5>
            <p class="text-muted">Coordenador-adjunto</p>
            <p class="card-text text-muted small">Saiba Mais</p>
          </div>
        </div>
      </div>
       <div class="col">
        <div class="card h-100 border-0 shadow-sm">
          <img src="assets/img/team3.jpg" class="card-img-top" alt="Leandro">
          <div class="card-body">
            <h5 class="card-title">Luciano Retzlaff</h5>
            <p class="text-muted">Coordenador-adjunto</p>
            <p class="card-text text-muted small">Saiba Mais</p>
          </div>
        </div>
      </div>
       <div class="col">
        <div class="card h-100 border-0 shadow-sm">
          <img src="assets/img/team3.jpg" class="card-img-top" alt="Leandro">
          <div class="card-body">
            <h5 class="card-title">Renato Preigschadt de Azevedo</h5>
            <p class="text-muted">Coordenador-adjunto</p>
            <p class="card-text text-muted small">Saiba Mais</p>
          </div>
        </div>
      </div>
       <div class="col">
        <div class="card h-100 border-0 shadow-sm">
          <img src="assets/img/team3.jpg" class="card-img-top" alt="Leandro">
          <div class="card-body">
            <h5 class="card-title">Arthur Montero Portella</h5>
            <p class="text-muted">Coordenador-adjunto</p>
            <p class="card-text text-muted small">Saiba Mais</p>
          </div>
        </div>
      </div>
       <div class="col">
        <div class="card h-100 border-0 shadow-sm">
          <img src="assets/img/team3.jpg" class="card-img-top" alt="Leandro">
          <div class="card-body">
            <h5 class="card-title">Eduarda Padilha Zorzo</h5>
            <p class="text-muted">Coordenador-adjunto</p>
            <p class="card-text text-muted small">Saiba Mais</p>
          </div>
        </div>
      </div>
       <div class="col">
        <div class="card h-100 border-0 shadow-sm">
          <img src="assets/img/team3.jpg" class="card-img-top" alt="Leandro">
          <div class="card-body">
            <h5 class="card-title">Henrique De Barros Da Silva</h5>
            <p class="text-muted">Coordenador-adjunto</p>
            <p class="card-text text-muted small">Saiba Mais</p>
          </div>
        </div>
      </div>
       <div class="col">
        <div class="card h-100 border-0 shadow-sm">
          <img src="assets/img/team3.jpg" class="card-img-top" alt="Leandro">
          <div class="card-body">
            <h5 class="card-title">Victor Couto Cardoso</h5>
            <p class="text-muted">Coordenador-adjunto</p>
            <p class="card-text text-muted small">Saiba Mais</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


    
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
    .como-funciona-section {
      background-color: #2d8844;
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
      background: #2d8844;

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
        { icon: 'bi-graph-up', title: 'Relatórios Inteligentes', text: 'Análise de dados para otimização do rebanho.' },
        { icon: 'bi-shield-lock-fill', title: 'Segurança', text: 'Dados protegidos e acesso controlado.' },
        { icon: 'bi-people-fill', title: 'Suporte Especializado', text: 'Equipe pronta para ajudar sempre que precisar.' }
      ]
    };
  }
};
</script>