<template>
  <ScatterBubbles
    v-if="grafSelecionado === 'todos' || grafSelecionado === 'desempenho'"
    title="Evolucao PV/Periodo"
    :pontos="pontos.EvolucaoPVPeriodo"
    x-label="Peso Vivo (kg)"
    y-label="Peso vivo (kg)"
    color="#16a34a"
    :highlight-id="highlightId"
    :x-formatter="(v) => v"
    :y-formatter="(v) => v"
    x-type="linear"
    @point-click="onPointClick"
  />

  <ScatterBubbles
    v-if="grafSelecionado === 'animal' || grafSelecionado === 'desempenho' || grafSelecionado === 'todos'"
    title="Evolução PV/Dia"
    :pontos="pontos.EvolucaoPVDia"
    x-label="Data"
    y-label="Peso Vivo (kg)"
    color="#16a34a"
    :highlight-id="highlightId"
    :x-formatter="formatDate"
    :y-formatter="(v) => v"
    x-type="time" 
    @point-click="onPointClick"
  />

  <ScatterBubbles
    v-if="grafSelecionado === 'animal' || grafSelecionado === 'todos'"
    title="Evolução do GMD"
    :pontos="pontos.EvolucaoGMD"
    x-label="Data"
    y-label="GMD (atual)"
    color="#16a34a"
    :highlight-id="highlightId"
    :x-formatter="formatDate"
    :y-formatter="formatKg"
    x-type="time" 
    @point-click="onPointClick"
  />

  <ScatterBubbles
    v-if="grafSelecionado === 'animal' || grafSelecionado === 'desempenho' || grafSelecionado === 'todos'"
    title="Evolução do Ganho"
    :pontos="pontos.EvolucaoGanho"
    x-label="Data"
    y-label="GMD (atual)"
    color="#16a34a"
    :highlight-id="highlightId"
    :x-formatter="formatDate"
    :y-formatter="formatKg"
    x-type="time" 
    @point-click="onPointClick"
  />
</template>

<script setup>
/* global defineProps, defineEmits */
import ScatterBubbles from '@/components/ScatterBubbles.vue'

defineProps({
  pontos: { type: Object, required: true },
  grafSelecionado: { type: String, required: true },
  highlightId: { type: [String, Number], default: null },
  formatDate: { type: Function, required: true },
  formatKg: { type: Function, required: true },
})

const emit = defineEmits(['point-click'])
const onPointClick = (p) => emit('point-click', p)
</script>