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
  formatReais: { type: Function, required: true },
})

const emit = defineEmits(['point-click'])
const onPointClick = (p) => emit('point-click', p)
</script>