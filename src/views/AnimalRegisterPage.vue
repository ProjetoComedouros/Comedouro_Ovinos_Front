<template>
  <div class="cadastro-container">
    <div class="cadastro-card">
      <button @click="goBack" class="btn btn-link p-0">
        <i class="bi bi-arrow-left"></i>
      </button>
      <h2 class="text-center mb-4">Cadastro de Animais</h2>

      <AnimalForm @submit-form="onFormSubmit" />
    </div>
  </div>
</template>

<script>
import AnimalForm from "@/components/AnimalRegisterPage/AnimalForm.vue";

export default {
  name: "AnimalRegisterPage",
  components: { AnimalForm },
  methods: {
    goBack() {
      this.$router.push("/report");
    },
    onFormSubmit(data) {
      console.log("Dados recebidos da criança:", data);
      // Aqui  salva no banco ou envia para API
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
  font-size: 1.2rem;
}
</style>
