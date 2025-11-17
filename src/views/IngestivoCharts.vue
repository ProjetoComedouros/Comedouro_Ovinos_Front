<template>
  <!-- GRÁFICO CONSOLIDADO DE COMPORTAMENTO INGESTIVO -->
  <ScatterBubbles v-if="grafSelecionado === 'todos' || grafSelecionado === 'ingestivo'" title="Comportamento Ingestivo"
    :pontos="pontosCombinadosIngestivo" x-label="Presença no comedouro" y-label="Horário / Duração"
    :highlight-id="highlightId" :x-formatter="(v) => v" :y-formatter="formatarEixoYCombinado" x-type="linear"
    @point-click="handleCombinedClick" />

  <ScatterBubbles v-if="grafSelecionado === 'todos' || grafSelecionado === 'ingestivo'" title="Consumo Diário"
    :pontos="pontos.consumoDiario" :chart-type="dynamicChartType" x-label="Data" y-label="Consumo (kg)" color="#0d6efd"
    :highlight-id="highlightId" :x-formatter="formatDate" :y-formatter="(v) => v"
    @point-click="(p) => emitPointClick(p, 'Consumo Diário', 'Consumo (kg)')" />
</template>

<script setup>
/* global defineProps, defineEmits */
import { computed } from 'vue';
import 'chartjs-adapter-date-fns';
import ScatterBubbles from '@/components/ScatterBubbles.vue'

// --- Props ---
const props = defineProps({
  // Prop de Controle (do ReportPage)
  modo: { type: String, required: true },
  // animalId: { type: String, required: true },

  // Props de Dados e Filtro
  pontos: { type: Object, required: true },
  grafSelecionado: { type: String, required: true },
  highlightId: { type: [String, Number], default: null },

  // Props de Formatação
  minutesToTime: { type: Function, required: true },
  minutesToTimeOfDay: { type: Function, required: true },
  // formatTime: { type: Function, required: true },
  formatDate: { type: Function, required: true },
});

// --- Emits ---
const emit = defineEmits(['point-click']);

// Função auxiliar para injetar o título e a label no ponto antes de emitir
const emitPointClick = (ponto, title, yUnit) => {
  emit('point-click', {
    ...ponto,
    title: title,
    y_unit: yUnit,
  });
};

// --- Lógica para o Gráfico Combinado ---

// 1. Combina os pontos de Hora Entrada, Saída e Duração em um único array de datasets
const pontosCombinadosIngestivo = computed(() => [
  { label: 'Hora Entrada', data: props.pontos.horaEntrada, backgroundColor: '#3b82f6' }, // Azul
  { label: 'Hora Saída', data: props.pontos.horaSaida, backgroundColor: '#16a34a' },   // Verde
  { label: 'Duração (min)', data: props.pontos.minRefeicao, backgroundColor: '#f97316' } // Laranja
]);

// 2. Formata o eixo Y dependendo do valor (se é hora do dia ou duração)
const formatarEixoYCombinado = (value, context) => {
  // No tooltip, o datasetLabel está disponível
  if (context && context.dataset && context.dataset.label) {
    const label = context.dataset.label;
    if (label.includes('Duração')) {
      return props.minutesToTime(value); // Formato MM:SS
    }
    return props.minutesToTimeOfDay(value); // Formato HH:MM
  }
  // Para os ticks do eixo, não temos o contexto do dataset, então usamos uma heurística.
  // Valores > 1440 (total de minutos em um dia) provavelmente não são horas.
  // Esta parte é uma aproximação, a formatação do tooltip é mais precisa.
  return value > 1440 ? props.minutesToTime(value) : props.minutesToTimeOfDay(value);
};

// 3. Emite o evento de clique com a unidade correta
const handleCombinedClick = (ponto) => {
  const yUnit = ponto.datasetLabel.includes('Duração')
    ? 'Duração (min)'
    : 'Hora (HH:MM)';

  emitPointClick(ponto, ponto.datasetLabel, yUnit);
};

const dynamicChartType = computed(() => {
  return props.modo === 'animal' ? 'line' : 'scatter';
});

</script>

<style scoped>
.card {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 14px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, .05);
  padding: 10px;
  height: 420px;
  margin-top: 16px;
}

.chart-title {
  font-size: 1.1rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 8px;
  color: #333;
}

.canvas-wrap {
  position: relative;
  height: calc(100% - 30px);
}
</style>