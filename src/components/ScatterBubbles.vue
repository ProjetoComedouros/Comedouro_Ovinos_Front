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
  color:  { type: String, default: '#2563eb' },
  highlightId: { type: [String, Number], default: null },
  xFormatter: { type: Function, default: v => v }, // ADICIONADO
  yFormatter: { type: Function, default: v => v },
  xType: {type:String, default: 'linear'},
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
      ? props.pontos.map(p => ({ x: p.x, y: p.y, r: p.r ?? 5 }))
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
          title: { display: true, text: props.xLabel },
          grid: { color: '#efefef' },
          type: props.xType, // 'linear' ou 'time'
          
          time: {
            unit:'day',
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
          ticks:{
            callback: value => props.yFormatter(value) //formata y
          }
        }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => {
             
              const p = ctx.raw
              return `${props.xLabel}: ${props.xFormatter(p.x)}, ${props.yLabel}: ${props.yFormatter(p.y)}`
            }
          }
        },
        title: { display: !!props.title, text: props.title }
      },
      onClick: (_evt, els) => {
        if (!els?.length) return
        const idx = els[0].index
        const p = props.pontos[idx]
        emit('point-click', p)
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
.card{
  background:#fff;border:1px solid #eee;border-radius:14px;box-shadow:0 4px 14px rgba(0,0,0,.05);
  padding:10px;height:420px
}
.canvas-wrap{position:relative;height:100%}
</style>