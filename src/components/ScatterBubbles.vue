<script setup>
/* eslint-disable */
/* global defineProps, defineEmits */
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { Chart } from 'chart.js/auto'
import 'chartjs-adapter-date-fns'

const props = defineProps({
  title: { type: String, default: '' },
  pontos: { type: Array, default: () => [] }, // [{x,y,r?, id, nome?, lote?, ...}]
  xLabel: { type: String, default: 'Eixo X' },
  yLabel: { type: String, default: 'Eixo Y' },
  color: { type: String, default: '#2563eb' },
  highlightId: { type: [String, Number], default: null },
  xFormatter: { type: Function, default: v => v }, //adicionei
  yFormatter: { type: Function, default: v => v },
  xType: { type: String, default: 'linear' },
  chartType: { type: String, default: 'scatter' }, // 'scatter' ou 'bubble-line'
})
const emit = defineEmits(['point-click'])

const canvasRef = ref(null)
let chart

import 'chartjs-adapter-date-fns'

const build = () => {
  if (chart) chart.destroy()

  chart = new Chart(canvasRef.value, {
    type: props.chartType === 'line' ? 'line' : 'scatter',
    data: {
      datasets: [{
        label: props.title || 'Evolução',
        data: Array.isArray(props.pontos)
          ? props.pontos.map(p => ({ x: p.x, y: p.y, r: p.r ?? 5, id: p.id, lote: p.lote }))
          : [],
        // A cor da linha (se houver) continua sendo a cor principal
        borderColor: props.chartType === 'line' ? props.color : 'rgba(0, 0, 0, 0.5)',
        backgroundColor: props.color,
        borderWidth: 1, // Adiciona uma borda de 1px
        fill: false,
        tension: 0.3,
        pointRadius: 3,
        showLine: props.chartType === 'bubble-line' || props.chartType === 'line'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      paring: true,
      scales: {
        x: {
          title: { display: true, text: props.xLabel },
          grid: { color: '#efefef' },
          type: props.xType, // 'linear' ou 'time'

          time: {
            unit: 'day',
            tooltipFormat: 'dd/MM/yyyy',
            displayFormats: {
              day: 'dd/MM/yyyy'
            }
          },
          ticks: {
            callback: value => props.xFormatter(value) //formata x
          }
        },
        y: {
          title: { display: true, text: props.yLabel },
          grid: { color: '#efefef' },
          ticks: {
            callback: value => props.yFormatter(value) //formata y
          }
        }
      },

      // ScatterBubbles.vue - Dentro da função build (Options)
      plugins: {
        legend: { display: false }, // Desativa a legenda, pois o título será um <h5>
        tooltip: {
          callbacks: {
            label: (context) => {
              const p = context.raw;
              const idDoFiltro = props.highlightId || p.id;
              const label = `ID: ${idDoFiltro || 'N/A'} | Lote: ${p.lote}`; // Mostra ID do filtro

              // Formata X (Data/Ref)
              const xValue = props.xFormatter(p.x); // Simplificando a chamada do formatter
              // Formata Y
              const yValue = props.yFormatter(p.y); // Simplificando a chamada do formatter

              return [
                label,
                `${props.xLabel}: ${xValue}`,
                `${props.yLabel}: ${yValue}`,
              ];
            }
          }
        }
      },
      onClick: (_evt, els) => {
        if (!els?.length) return
        const idx = els[0].index
        const p = props.pontos[idx]
        emit('point-click', {
          ...p,
          y_unit: props.yLabel, // ✅ CORRETO
          title: props.title,
          x_type: props.xType // Adiciona o tipo do eixo X ao evento
        })
      },
      hover: { mode: 'nearest', intersect: true }
    }
  })
}


onMounted(build)
onBeforeUnmount(() => chart?.destroy())
watch(() => [props.pontos, props.highlightId, props.chartType], build, { deep: true })
</script>

<template>
  <div class="card">
    <h5 v-if="title" class="chart-title">{{ title }}</h5>
    <div class="canvas-wrap">
      <canvas ref="canvasRef"></canvas>
    </div>
  </div>
</template>

<style scoped>
.card {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 14px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, .05);
  padding: 10px;
  height: 420px
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
  /* Ajusta a altura para acomodar o título */
  height: calc(100% - 30px);
}
</style>