<template>
  <div class="cadastro-container">
    <div class="cadastro-card">
      <button @click="goBack" class="btn btn-link p-0">
      <i class="bi bi-arrow-left"></i>
      </button>
      <h2 class="text-center mb-4">Cadastro de Animal</h2>

      <form @submit.prevent="handleSubmit">
        <div class="mb-3">
          <label class="form-label">Nome do Animal</label>
          <input type="text" class="form-control" v-model="animal.nome" required />
        </div>

        <div class="mb-3">
          <label class="form-label">Identificação (Brinco)</label>
          <input type="text" class="form-control" v-model="animal.brinco" required />
        </div>

        <div class="mb-3">
          <label class="form-label">Lote</label>
          <input type="text" class="form-control" v-model="animal.lote" />
        </div>

        <div class="mb-3">
          <label class="form-label">Nascimento</label>
          <input type="date" class="form-control" v-model="animal.nascimento" />
        </div>

        <div class="mb-3">
          <label class="form-label">Peso Inicial (kg)</label>
          <input type="number" class="form-control" v-model="animal.peso" />
        </div>

        <button type="submit" class="btn btn-success w-100">Salvar</button>
      </form>

      <div v-if="showSuccess" class="alert alert-success mt-3">
        Animal cadastrado com sucesso!
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AnimalRegisterPage",
  data() {
    return {
      animal: {
        nome: "",
        brinco: "",
        lote: "",
        nascimento: "",
        peso: ""
      },
      showSuccess: false
    };
  },
  methods: {
    handleSubmit() {
      console.log('Animal cadastrado:', this.animal);
      this.showSuccess = true;
      this.animal = {
        nome: "",
        brinco: "",
        lote: "",
        nascimento: "",
        peso: ""
      };
      setTimeout(() => {
        this.showSuccess = false;
      }, 3000);
    },
    goBack() {
        this.$router.push('/report');
        }
  }
};
</script>

<style>
.cadastro-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  background-color: #f8f9fa;
}

.cadastro-card {
  width: 100%;
  max-width: 500px;
  padding: 2rem;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
}

.cadastro-card .btn-link {
  color: black;
  font-weight: bold;
  padding: 0.5rem 1rem;
  text-decoration: none; 
  font-size: 1.2rem;
}
</style>