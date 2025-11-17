<template>
  <ScatterBubbles v-if="grafSelecionado === 'todos' || grafSelecionado === 'viabilidade'" title="Evolução Custo Diário"
    :pontos="pontos.evolucaoCusto" :chartType="dynamicChartType" x-label="Data" y-label="Reais (R$)" color="#f97316"
    :highlight-id="highlightId" :x-formatter="formatDate" :y-formatter="formatReais" x-type="time"
    @point-click="(p) => emitPointClick(p, 'Evolução Custo Diário', 'Reais (R$)')" />

  <ScatterBubbles v-if="grafSelecionado === 'todos' || grafSelecionado === 'viabilidade'" title="Ganho por Dia"
    :pontos="pontos.ganhopordia" :chartType="dynamicChartType" x-label="Data" y-label="Reais (R$)" color="#0b5ed7"
    :highlight-id="highlightId" :x-formatter="formatDate" :y-formatter="formatReais" x-type="time"
    @point-click="(p) => emitPointClick(p, 'Ganho por Dia', 'Reais (R$)')" />

  <div class="card" v-if="grafSelecionado === 'todos' || grafSelecionado === 'viabilidade'">
    <h5 class="chart-title">Viabilidade Econômica / Diária</h5>
    <div class="canvas-wrap">
      <canvas ref="combinedCanvasRef"></canvas>
    </div>
  </div>
</template>

<script setup>
/* global defineProps, defineEmits */
import { onMounted, onBeforeUnmount, ref, watch, computed } from 'vue';
import { Chart } from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import ScatterBubbles from '@/components/ScatterBubbles.vue';

// --- Props (Componente "Burro") ---
const props = defineProps({
  modo: { type: String, required: true },
  // animalId: { type: String, required: true },
  pontos: { type: Object, required: true },
  grafSelecionado: { type: String, required: true },
  highlightId: { type: [String, Number], default: null },
  formatDate: { type: Function, required: true },
  formatKg: { type: Function, required: true }, // Mantido (embora não usado aqui)
  formatReais: { type: Function, required: true },
});

const emit = defineEmits(['point-click']);

// --- Lógica para Gráficos Separados (ScatterBubbles) ---
const emitPointClick = (ponto, title, yUnit) => {
  emit('point-click', {
    ...ponto,
    title: title,
    y_unit: yUnit,
  });
};

// Lógica para decidir o tipo de gráfico (Linha ou Bolinhas)
// --- Lógica de Gráfico Dinâmico ---
// ⬅️ CORREÇÃO: Lógica simplificada (não verifica mais 'animalId')
const dynamicChartType = computed(() => {
  return props.modo === 'animal' ? 'line' : 'scatter';
});

// --- Lógica para Gráfico 4 (Combinado) ---
const combinedCanvasRef = ref(null);
let combinedChart;

const buildCombinedChart = () => {
  if (combinedChart) combinedChart.destroy();

  // Helper para garantir que temos um array
  const getData = (key) => (Array.isArray(props.pontos[key]) ? props.pontos[key] : []);

  // Verifica se o canvas existe antes de criar o gráfico
  if (!combinedCanvasRef.value) return;

  combinedChart = new Chart(combinedCanvasRef.value, {
    type: 'line', // Define o tipo do gráfico permanentemente como 'line'
    data: {
      datasets: [
        {
          label: 'Custo/Dia (R$)',
          data: getData('evolucaoCusto'),
          borderColor: '#f97316',
          backgroundColor: '#f97316',
          fill: false,
          tension: 0.3,
          pointRadius: 3,
          borderWidth: 1,
          showLine: true, // Garante que a linha seja sempre exibida
        },
        {
          label: 'Ganho/Dia (R$)',
          data: getData('ganhopordia'),
          borderColor: '#0b5ed7',
          backgroundColor: '#0b5ed7',
          fill: false,
          tension: 0.3,
          pointRadius: 3,
          borderWidth: 1,
          showLine: true, // Garante que a linha seja sempre exibida
        },
        {
          label: 'Viabilidade/Dia (R$)',
          data: getData('viabilidade'),
          borderColor: '#198754',
          backgroundColor: '#198754',
          fill: false,
          tension: 0.3,
          pointRadius: 3,
          borderWidth: 1,
          showLine: true, // Garante que a linha seja sempre exibida
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          type: 'time',
          time: { unit: 'day', tooltipFormat: 'dd/MM/yyyy', displayFormats: { day: 'dd/MM' } },
          grid: { color: '#efefef' },
          ticks: { callback: (value) => props.formatDate(value) }
        },
        y: {
          title: { display: true, text: 'R$' },
          grid: { color: '#efefef' },
          ticks: { callback: (value) => props.formatReais(value) }
        }
      },
      plugins: {
        legend: { position: 'bottom' },
        labels: { // ⬅️ ADICIONE ESTE BLOCO 'labels'
          font: {
            weight: 'normal' // Define a fonte da legenda como 'normal'
          }
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              const label = context.dataset.label || '';
              const p = context.raw;
              const xValue = props.formatDate(p.x);
              const yValue = props.formatReais(p.y);
              const idLabel = props.highlightId ? `Animal: ${props.highlightId}` : `Animal: ${p.id}`;
              return `${label} | ${xValue}: ${yValue} (${idLabel})`;
            }
          }
        }
      },
      onClick: (evt, els) => {
        if (!els?.length) return;
        const el = els[0];
        const datasetLabel = combinedChart.data.datasets[el.datasetIndex].label;
        const ponto = combinedChart.data.datasets[el.datasetIndex].data[el.index];

        emit('point-click', {
          ...ponto,
          y_unit: datasetLabel || 'R$',
          title: 'Viabilidade Econômica'
        });
      }
    }
  });
};

// Hooks do Vue para construir/destruir o gráfico combinado
onMounted(buildCombinedChart);
onBeforeUnmount(() => {
  if (combinedChart) combinedChart.destroy();
});
// Observa a prop 'pontos' e redesenha o gráfico se ela mudar
watch(() => [props.pontos, props.modo, props.grafSelecionado], buildCombinedChart, { deep: true });
</script>

<style scoped>
.card {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 14px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, .05);
  padding: 10px;
  height: 420px;
  /* Adiciona uma margem para separar do último ScatterBubbles */
  margin-top: 16px;
}

.chart-title {
  font-size: 1.1rem;
  font-weight: normal;
  text-align: center;
  margin-bottom: 8px;
  color: #333;
}

.canvas-wrap {
  position: relative;
  height: calc(100% - 30px);
}
</style>