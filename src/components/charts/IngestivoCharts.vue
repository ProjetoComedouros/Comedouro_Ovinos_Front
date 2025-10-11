<template>
  <ScatterBubbles
    v-if="grafSelecionado === 'todos' || grafSelecionado === 'ingestivo'"
    title="Comportamento Ingestivo"
    :pontos="pontos.ingestivo"
    x-label="Presença no comedouro"
    y-label="Horas"
    color="#f59e0b"
    :highlight-id="highlightId"
    :x-formatter="(v) => v"
    :y-formatter="minutesToTime"
    chart-type="scatter"
    x-type="linear"
    @point-click="onPointClick"
  />

  <ScatterBubbles
    v-if="grafSelecionado === 'animal' || grafSelecionado === 'ingestivo'"
    title="Hora Entrada"
    :pontos="pontos.horaEntrada"
    x-label="Presença no comedouro"
    y-label="Hora"
    color="orange"
    :highlight-id="highlightId"
    :x-formatter="(v) => v"
    :y-formatter="minutesToTime"
    x-type="linear"
    @point-click="onPointClick"
  />

  <ScatterBubbles
    v-if="grafSelecionado === 'animal' || grafSelecionado === 'todos'"
    title="Hora Entrada (Linha)"
    :pontos="pontos.horaEntrada"
    x-label="Presença no comedouro"
    y-label="Hora"
    color="orange"
    :highlight-id="highlightId"
    x-type="linear"
    :x-formatter="(v) => v"
    :y-formatter="minutesToTime"
    chart-type="line"
    @point-click="onPointClick"
  />

  <ScatterBubbles
    v-if="grafSelecionado === 'todos' || grafSelecionado === 'horaSaida'"
    title="Hora Saída"
    :pontos="pontos.horaSaida"
    x-label="Presença no comedouro"
    y-label="Hora"
    color="green"
    :highlight-id="highlightId"
    :x-formatter="(v) => v"
    :y-formatter="minutesToTime"
    x-type="linear"
    @point-click="onPointClick"
  />

  <ScatterBubbles
    v-if="grafSelecionado === 'animal' || grafSelecionado === 'ingestivo' || grafSelecionado === 'todos' || grafSelecionado === 'minRefeicao'"
    title="Min/Refeição"
    :pontos="pontos.minRefeicao"
    x-label="Presença no comedouro"
    y-label="Minutos"
    color="blue"
    :highlight-id="highlightId"
    :x-formatter="(v) => v"
    :y-formatter="minutesToTime"
    x-type="linear"
    @point-click="onPointClick"
  />

  <ScatterBubbles
    v-if="grafSelecionado === 'animal' || grafSelecionado === 'ingestivo' || grafSelecionado === 'todos' || grafSelecionado === 'consumoDiario'"
    title="Consumo Diário"
    :pontos="pontos.consumoDiario"
    x-label="Data"
    y-label="Kg"
    color="purple"
    :highlight-id="highlightId"
    x-type="time"
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
  minutesToTime: { type: Function, required: true },
  formatDate: { type: Function, required: true },
})

const emit = defineEmits(['point-click'])
const onPointClick = (p) => emit('point-click', p)
</script>