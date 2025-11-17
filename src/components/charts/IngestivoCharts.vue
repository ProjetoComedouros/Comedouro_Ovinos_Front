<template>
  <ScatterBubbles v-if="grafSelecionado === 'todos' || grafSelecionado === 'ingestivo'" title="Hora Entrada"
    :pontos="pontos.horaEntrada" :chart-type="dynamicChartType" x-label="Presença no comedouro" y-label="Horas" color="orange"
    :highlight-id="highlightId" :x-formatter="(v) => v" :y-formatter="minutesToTimeOfDay" x-type="linear"
    @point-click="(p) => emitPointClick(p, 'Hora Entrada', 'Hora (HH:MM)')" />

  <ScatterBubbles v-if="grafSelecionado === 'todos' || grafSelecionado === 'ingestivo'" title="Hora Saída"
    :pontos="pontos.horaSaida" :chart-type="dynamicChartType" x-label="Presença no comedouro" y-label="Horas" color="green" :highlight-id="highlightId"
    :x-formatter="(v) => v" :y-formatter="minutesToTimeOfDay" x-type="linear"
    @point-click="(p) => emitPointClick(p, 'Hora Saída', 'Hora (HH:MM)')" />

  <ScatterBubbles
    v-if="grafSelecionado === 'animal' || grafSelecionado === 'ingestivo' || grafSelecionado === 'todos' || grafSelecionado === 'ingestivo'"
    title="Consumo Diário" :pontos="pontos.consumoDiario" :chart-type="dynamicChartType" x-label="Data"
    y-label="Consumo (kg)" color="#0d6efd" :highlight-id="highlightId" :x-formatter="formatDate" :y-formatter="(v) => v"
    @point-click="(p) => emitPointClick(p, 'Consumo Diário', 'Consumo (kg)')" />

  <div class="card" v-if="grafSelecionado === 'todos' || grafSelecionado === 'ingestivo'">
    <h5 class="chart-title">Comportamento Ingestivo</h5>
    <div class="canvas-wrap">
      <canvas ref="combinedIngestivoCanvas"></canvas>
    </div>
  </div>
</template>

<script setup>
/* global defineProps, defineEmits */
import { onMounted, onBeforeUnmount, ref, watch, computed } from 'vue';
import { Chart } from 'chart.js/auto';
import ScatterBubbles from '@/components/ScatterBubbles.vue'

// --- Props ---
const props = defineProps({
  // Prop de Controle (do ReportPage)
  modo: { type: String, required: true },
  animalId: { type: String, required: true },

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

// --- Lógica do Gráfico ---
const combinedIngestivoCanvas = ref(null);
let combinedChart;

const buildCombinedChart = () => {
  if (combinedChart) combinedChart.destroy();
  if (!combinedIngestivoCanvas.value) return;

  const getData = (key) => (Array.isArray(props.pontos[key]) ? props.pontos[key] : []);

  // Define o tipo de gráfico (linha ou bolhas) baseado no modo
  const chartType = props.modo === 'animal' ? 'line' : 'scatter';
  // Define se a linha deve ser mostrada
  const showLine = props.modo === 'animal';

  combinedChart = new Chart(combinedIngestivoCanvas.value, {
    type: chartType, // Usa o tipo dinâmico
    data: {
      datasets: [
        {
          label: 'Hora Entrada',
          data: getData('horaEntrada').map(p => ({ ...p })),
          borderColor: chartType === 'line' ? '#f97316' : 'rgba(0, 0, 0, 0.5)',
          backgroundColor: '#f97316',
          yAxisID: 'y-horas',
          pointRadius: 3,
          borderWidth: 1,
          showLine: showLine,
          tension: 0.1
        },
        {
          label: 'Hora Saída',
          data: getData('horaSaida').map(p => ({ ...p })),
          borderColor: chartType === 'line' ? '#198754' : 'rgba(0, 0, 0, 0.5)',
          backgroundColor: '#198754',
          yAxisID: 'y-horas',
          pointRadius: 3,
          borderWidth: 1,
          showLine: showLine,
          tension: 0.1
        },
        {
          label: 'Min/Refeição (Duração)',
          data: getData('ingestivo'), // (Usa 'ingestivo' para a duração)
          borderColor: chartType === 'line' ? '#0b5ed7' : 'rgba(0, 0, 0, 0.5)',
          backgroundColor: '#0b5ed7',
          yAxisID: 'y-duracao',
          pointRadius: 3,
          borderWidth: 1,
          showLine: showLine,
          tension: 0.1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          type: 'linear', // Eixo X é Contagem de Refeição (1, 2, 3...)
          title: { display: true, text: 'Presença no Comedouro' }
        },
        // Eixo Y Esquerdo (Horas)
        'y-horas': {
          type: 'linear',
          position: 'left',
          title: { display: true, text: 'Horas' },
          grid: { color: '#efefef' },
          min: 0,
          max: 1440,
          ticks: {
            stepSize: 180,
            callback: (value) => props.minutesToTimeOfDay(value)
          }
        },
        // Eixo Y Direito (Duração)
        'y-duracao': {
          type: 'linear',
          position: 'right',
          title: { display: true, text: 'Duração (min)' },
          grid: {
            drawOnChartArea: false,
          },
          min: 0,
          ticks: {
            callback: (value) => props.minutesToTime(value)
          }
        }
      },
      plugins: {
        legend: {
          position: 'top', // Move a legenda para o topo
          align: 'center',  // Centraliza a legenda
          labels: {
            font: {
              weight: 'normal' // Remove o negrito da legenda
            }
          }
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              const label = context.dataset.label || '';
              const p = context.raw;
              const xValue = p.x;

              let yValue;
              if (context.dataset.yAxisID === 'y-horas') {
                yValue = props.minutesToTimeOfDay(p.y);
              } else {
                yValue = props.minutesToTime(p.y);
              }

              // Mostra o ID e o Lote no tooltip
              const idLabel = props.highlightId
                ? `Animal: ${props.highlightId}`
                : `Animal: ${p.id} | Lote: ${p.lote || 'N/A'}`;

              return `${label} | Refeição #${xValue}: ${yValue} (${idLabel})`;
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
          y_unit: datasetLabel || 'Valor',
          title: 'Comportamento Ingestivo'
        });
      }
    }
  });
};

// Hooks do Vue para construir/destruir o gráfico
onMounted(buildCombinedChart);
onBeforeUnmount(() => {
  if (combinedChart) combinedChart.destroy();
});
// Observa a prop 'pontos' E o 'modo' e redesenha o gráfico se ela mudar
watch(() => [props.pontos, props.modo, props.highlightId, props.grafSelecionado], buildCombinedChart, { deep: true });


// Função auxiliar para injetar o título e a label no ponto antes de emitir
const emitPointClick = (ponto, title, yUnit) => {
  emit('point-click', {
    ...ponto,
    title: title,
    y_unit: yUnit,
  });
};

// Lógica para decidir o tipo de gráfico (Linha ou Bolinhas)
const dynamicChartType = computed(() => {
  // Se for 'animal', mostra 'line' (linha de tendência)
  // Se for 'lote' ou 'geral', mostra 'scatter' (bolinhas)
  if (props.modo === 'animal' && props.animalId) {
    return 'line';
  }
  return 'scatter';
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