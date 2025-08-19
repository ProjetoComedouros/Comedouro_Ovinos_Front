<script setup>
/* global defineProps, defineEmits */
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { Chart } from 'chart.js/auto'

const props = defineProps({
  title: { type: String, default: '' },
  pontos: { type: Array, default: () => [] }, // [{x,y,r?, id, nome?, lote?, ...}]
  xLabel: { type: String, default: 'Eixo X' },
  yLabel: { type: String, default: 'Eixo Y' },
  color:  { type: String, default: '#2563eb' },
  highlightId: { type: [String, Number], default: null }
})
const emit = defineEmits(['point-click'])

const canvasRef = ref(null)
let chart

const build = () => {
  if (chart) chart.destroy()

  chart = new Chart(canvasRef.value, {
    type: 'bubble',
    data: {
      datasets: [{
        label: props.title || 'Dispersão',
        data: props.pontos.map(p => ({ ...p, x: p.x, y: p.y, r: p.r ?? 6 })),
        parsing: false,
        backgroundColor: (ctx) => {
          const raw = ctx.raw
          const sel = props.highlightId != null && raw?.id === props.highlightId
          return sel ? 'rgba(234,88,12,0.9)' : props.color + 'cc'
        },
        borderColor: (ctx) => {
          const raw = ctx.raw
          const sel = props.highlightId != null && raw?.id === props.highlightId
          return sel ? '#ea580c' : props.color
        },
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { title: { display: true, text: props.xLabel }, grid: { color: '#efefef' } },
        y: { title: { display: true, text: props.yLabel }, grid: { color: '#efefef' } }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => {
              const p = ctx.raw
              const linhas = [
                `Animal: ${p?.id ?? '—'}`,
                p?.nome ? `Nome: ${p.nome}` : null,
                p?.lote ? `Lote: ${p.lote}` : null,
                `${props.xLabel}: ${p.x}`,
                `${props.yLabel}: ${p.y}`
              ].filter(Boolean)
              return linhas
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
