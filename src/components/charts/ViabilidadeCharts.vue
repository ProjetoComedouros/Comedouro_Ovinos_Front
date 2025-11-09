<template>
  <ScatterBubbles
    v-if="grafSelecionado === 'todos' || grafSelecionado === 'viabilidade'"
    title="Custo Total"
    :pontos="pontos.custo"
    x-label="Peso vivo (kg)"
    y-label="Peso vivo (kg)"
    color="#2563eb"
    :highlight-id="highlightId"
    :x-formatter="formatKg"
    :y-formatter="formatKg"
    x-type="linear"
    @point-click="onPointClick"
  />

  <ScatterBubbles
    v-if="grafSelecionado === 'todos' || grafSelecionado === 'viabilidade'"
    title="Evolução Custo"
    :pontos="pontos.evolucaocusto"
    x-label="Data"
    y-label="Reais (R$)"
    color="#2563eb"
    :highlight-id="highlightId"
    :x-formatter="formatDate"
    :y-formatter="formatReais"
    @point-click="onPointClick"
  />

  <ScatterBubbles
    v-if="grafSelecionado === 'todos' || grafSelecionado === 'viabilidade'"
    title="Ganho por dia"
    :pontos="pontos.ganhopordia"
    x-label="Data"
    y-label="Reais (R$)"
    color="#2563eb"
    :highlight-id="highlightId"
    :x-formatter="formatDate"
    :y-formatter="(v) => v"
    @point-click="onPointClick"
  />

  <ScatterBubbles
    v-if="grafSelecionado === 'todos' || grafSelecionado === 'viabilidade'"
    title="Viabilidade Econômica diária"
    :pontos="pontos.viabilidade"
    x-label="Data"
    y-label="Reais (R$)"
    color="#2563eb"
    :highlight-id="highlightId"
    :x-formatter="formatDate"
    :y-formatter="(v) => v"
    @point-click="onPointClick"
  />

  <!-- Novo gráfico para Custo Diário (API) -->
  <ScatterBubbles
    v-if="grafSelecionado === 'animal' || grafSelecionado === 'todos' || grafSelecionado === 'viabilidade'"
    title="Custo Diário (API)"
    :pontos="pontosCustoDiarioTransformados"
    x-label="Data"
    y-label="Reais (R$)"
    color="#2563eb"
    :highlight-id="highlightId"
    :x-formatter="formatDate"
    :y-formatter="formatReais"
    x-type="time"
    @point-click="onPointClick"
  />
</template>

<script setup>
/* global defineProps, defineEmits */
// Importa as funções da Composition API do Vue
import { ref, computed, onMounted } from 'vue'
import ScatterBubbles from '@/components/ScatterBubbles.vue'
// import { getCustoDiario } from '@/api/viabilidade.js'

// Mock da função da API para demonstração.
// Em um cenário real, você importaria isso de um arquivo de serviço:
// import { getCustoDiario } from '@/api/viabilidade.js';
const getEvolucaoCustoDiario = async (tipo, id) => {
  console.log(`[API MOCK] Buscando Custo Diário para ${tipo} ${id}`);
  // Simula o atraso da API
  await new Promise(resolve => setTimeout(resolve, 500));
  // Retorna dados no formato { data: valor }
  return {
    "2023-10-01": 1.50,
    "2023-10-08": 1.55,
    "2023-10-15": 1.52,
    "2023-10-22": 1.60,
    "2023-10-29": 1.65,
    "2023-11-05": 1.62,
    "2023-11-12": 1.68,
    "2023-11-19": 1.70,
    "2023-11-26": 1.67,
    "2023-12-03": 1.72,
  };
};

defineProps({
  viabilidade: { 
        type: [String, Object, null], // Permite String ou Object ou null
        default: null 
    },
  pontos: { type: Object, required: true },
  grafSelecionado: { type: String, required: true },
  highlightId: { type: [String, Number], default: null },
  formatDate: { type: Function, required: true },
  formatKg: { type: Function, required: true },
  formatReais: { type: Function, required: true },
  // Adiciona props para receber os IDs para a chamada da API
  animalId: { type: [String, Number], default: null },
  loteId: { type: [String, Number], default: null },
})

const emit = defineEmits(['point-click'])
const onPointClick = (p) => emit('point-click', p)

// Variável reativa para armazenar os DADOS BRUTOS da API
const dadosCustoDiarioBrutos = ref(null);

// Função de transformação para o formato do gráfico
function transformarDadosCusto(dadosBrutos) {
  if (!dadosBrutos || typeof dadosBrutos !== 'object') {
    return [];
  }
  return Object.entries(dadosBrutos).map(([data, valor]) => ({
    x: data,
    y: valor,
    id: data // Usa a data como ID
  }));
}

// Propriedade computada para dados prontos para o gráfico
const pontosCustoDiarioTransformados = computed(() => {
  // Se a API ainda não retornou ou deu erro, retorna um array vazio.
  if (!dadosCustoDiarioBrutos.value) {
    return [];
  }
  // Transforma os dados brutos
  return transformarDadosCusto(dadosCustoDiarioBrutos.value);
});

// Hook onMounted para buscar os dados da API
onMounted(async () => {
  const TIPO_ALVO = 'animal'; // Exemplo, você pode usar this.animalId ou this.loteId
  const BRINCO_ALVO = 52; // Exemplo
  try {
    const dados = await getEvolucaoCustoDiario(TIPO_ALVO, BRINCO_ALVO);
    dadosCustoDiarioBrutos.value = dados;
  } catch (error) {
    console.error("[API Erro] Falha ao buscar Custo Diário.", error);
  }
});
</script>