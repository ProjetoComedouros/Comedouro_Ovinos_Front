<script setup>
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
  chartType: { type: String, default: 'scatter' } // 'scatter' ou 'bubble-line'
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
          ? props.pontos.map(p => ({ x: p.x, y: p.y, r: p.r ?? 5, id: p.id }))
          : [],
        borderColor: props.color,
        backgroundColor: props.color,
        fill: false,
        tension: 0.3,
        pointRadius: props.chartType === 'scatter' || props.chartType === 'bubble-line' ? 5 : 0,
        showLine: props.chartType === 'bubble-line' || props.chartType === 'line'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      paring: true,
      scales: {
        x: {
          title: { display: false, text: props.xLabel },
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
          title: { display: false, text: props.yLabel },
          grid: { color: '#efefef' },
          ticks: {
            callback: value => props.yFormatter(value) //formata y
          }
        }
      },
      // ScatterBubbles.vue - Dentro da função build (Options)

      plugins: {
        legend: {
          labels: {
            // Remove a caixa colorida ao lado da legenda
            boxWidth: 0
          }
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              const p = context.raw;
              // Se highlightId existe (no modo Animal), use-o; senão, use o ID do ponto (data).
              const idDoFiltro = props.highlightId || p.id;
              const label = `ID: ${idDoFiltro || 'N/A'}`; // Mostra ID do filtro

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
          y_unit: props.yUnit, // Adiciona o rótulo do Eixo Y (Minutos, Kg, Horas)
          title: props.title // Adiciona o título do gráfico
        })
      },
      hover: { mode: 'nearest', intersect: true }
    }
  })
}


onMounted(build)
onBeforeUnmount(() => chart?.destroy())
watch(() => [props.pontos, props.highlightId], build, { deep: true })
</script>

<template>
  <div class="card">
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

.canvas-wrap {
  position: relative;
  height: 100%
}
</style>