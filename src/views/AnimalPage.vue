<template>
  <div class="container-info">
    <button @click="goBack" class="btn btn-link p-0">
      <i class="bi bi-arrow-left"></i>
      </button>
    <h1>
      <i class="bi bi-patch-check-fill me-2"></i>
      Informações da Ovelha
    </h1>

    <div
      class="fs-5 text-center"
      :class="info ? 'text-dark text-start' : 'alert-warning'"
    >
      <template v-if="info">
        <p><strong>Nome:</strong> {{ info.nome }}</p>
        <p><strong>Peso:</strong> {{ info.peso }}</p>
        <p><strong>Idade:</strong> {{ idadeFormatada }}</p>
        <p class="data-registro">
          Data de Registro: {{ dataFormatada(info.dataRegistro) }}
        </p>
      </template>
      <template v-else>
        Animal não encontrado.
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "OvelhaInfo",
  data() {
    return {
      info: null,
    };
  },
  computed: {
    idadeFormatada() {
      if (!this.info) return "";
      const meses = this.info.idadeMeses;
      const anos = Math.floor(meses / 12);
      const restoMeses = meses % 12;
      let texto = "";

      if (anos > 0) texto += `${anos} ${anos === 1 ? "ano" : "anos"}`;
      if (restoMeses > 0) {
        if (anos > 0) texto += " e ";
        texto += `${restoMeses} ${restoMeses === 1 ? "mês" : "meses"}`;
      }

      return texto || "0 meses";
    },
  },
  methods: {
    dataFormatada(data) {
      return new Date(data).toLocaleDateString("pt-BR");
    },
    goBack() {
        this.$router.push('/report');
        }
  },
  mounted() {
    const dadosAnimais = {
      ovelha1: {
        nome: "Ovelha 001",
        peso: "45kg",
        idadeMeses: 24,
        dataRegistro: "2023-04-15",
      },
      ovelha2: {
        nome: "Ovelha 002",
        peso: "47kg",
        idadeMeses: 18,
        dataRegistro: "2023-05-10",
      },
      ovelha3: {
        nome: "Ovelha 003",
        peso: "50kg",
        idadeMeses: 36,
        dataRegistro: "2023-01-20",
      },
    };
    

    const id = this.$route.query.id;
    this.info = dadosAnimais[id] || null;
  },
};
</script>

<style scoped>
:root {
  --verde-nata: #198754;
  --fundo-claro: #f8f9fa;
  --texto-cinza: #444;
}

body {
  font-family: "Segoe UI", sans-serif;
  background-color: var(--fundo-claro);
  padding: 2rem;
  min-height: 100vh;
}

.container-info {
  max-width: 600px;
  background-color: white;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 0 10px rgb(0 0 0 / 0.05);
  margin: 2rem auto;
}

h1 {
  color: var(--verde-nata);
  margin-bottom: 1.5rem;
  font-weight: 700;
  text-align: center;
}

p {
  font-size: 1.1rem;
  color: var(--texto-cinza);
  margin-bottom: 1rem;
}

.data-registro {
  font-size: 0.9rem;
  color: #666;
  font-style: italic;
  margin-top: 1.5rem;
  text-align: right;
}

.alert-warning {
  text-align: center;
  font-weight: 600;
  color: #dc3545;
}

.container-info .btn-link {
  color: black;
  font-weight: bold;
  padding: 0.5rem 1rem;
  text-decoration: none; 
  font-size: 1.2rem;
}
</style>
