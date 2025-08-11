<template>
  <div>
    <Navbar />
    <Sidebar />

    <div class="content">
      <h3 class="mb-4">Relatório</h3>
      <ReportHeader :selecionado="selecionado" />

      <div class="table-placeholder">
        <div class="row fw-semibold mb-2">
          <div class="col-md">Animal</div>
          <div class="col-md">Comp. Digestivo</div>
          <div class="col-md">Desempenho</div>
          <div class="col-md">Viabilidade</div>
        </div>

        <AnimalCard v-for="animal in animais" :key="animal.id" :animal="animal" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Navbar from '@/components/ReportPage/ReportNavbar.vue'
import Sidebar from '@/components/ReportPage/ReportSidebar.vue'
import ReportHeader from '@/components/ReportPage/ReportHeader.vue'
import AnimalCard from '@/components/ReportPage/AnimalCard.vue'

const selecionado = ref(false)

const animais = ref([
  {
    id: 'ovelha1',
    nome: 'Ovelha 01',
    digestivo: 'OK',
    desempenho: 'Alta',
    viabilidade: 'Viável',
  },
  {
    id: 'ovelha2',
    nome: 'Ovelha 02',
    digestivo: 'OK',
    desempenho: 'Baixa',
    viabilidade: 'Inviável',
  },
  {
    id: 'ovelha3',
    nome: 'Ovelha 03',
    digestivo: 'OK',
    desempenho: 'Baixa',
    viabilidade: 'Inviável',
  },
])
</script>

<style scoped>
:root {
  --verde-nata: #198754;
  --fundo-claro: #f8f9fa;
  --texto-cinza: #444;
}

body {
  font-family: 'Segoe UI', sans-serif;
}

.content {
  margin-left: 220px;
  padding: 2rem;
  margin-top: 56px;
}

.table-placeholder {
  background-color: #ffffff;
  border: 1px solid #dee2e6;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
}
</style>
