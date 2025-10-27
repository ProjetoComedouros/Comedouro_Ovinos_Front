<template>
  <ScatterBubbles
    v-if="grafSelecionado === 'todos' || grafSelecionado === 'ingestivo'"
    title="Duração da Refeição"
    :pontos="pontos.ingestivo"
    x-label="Refeição (Nº)"
    y-label="Duração (min)"
    color="#f59e0b"
    :highlight-id="props.highlightId"
    :x-formatter="(v) => v"
    :y-formatter="minutesToTime"
    chart-type="scatter"
    x-type="linear"
    @point-click="onPointClick"
  />

  <ScatterBubbles
    v-if="grafSelecionado === 'todos' || grafSelecionado === 'ingestivo'"
    title="Hora Entrada"
    :pontos="pontos.horaEntrada"
    x-label="Refeição (Nº)"
    y-label="Hora"
    color="orange"
    :highlight-id="highlightId"
    :x-formatter="(v) => v"
    :y-formatter="minutesToTime"
    x-type="linear"
    @point-click="onPointClick"
  />

  <ScatterBubbles
    v-if="grafSelecionado === 'todos' || grafSelecionado === 'ingestivo'"
    title="Hora Entrada (Linha)"
    :pontos="pontos.horaEntrada"
    x-label="Refeição (Nº)"
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
    v-if="grafSelecionado === 'todos' || grafSelecionado === 'ingestivo'"
    title="Hora Saída"
    :pontos="pontos.horaSaida"
    x-label="Refeição (Nº)"
    y-label="Hora"
    color="green"
    :highlight-id="highlightId"
    :x-formatter="(v) => v"
    :y-formatter="minutesToTime"
    x-type="linear"
    @point-click="onPointClick"
  />

  <ScatterBubbles
    v-if="grafSelecionado === 'todos' || grafSelecionado === 'ingestivo'"
    title="Min/Refeição"
    :pontos="pontos.minRefeicao"
    x-label="Data"
    y-label="Minutos"
    color="blue"
    :highlight-id="highlightId"
    :x-formatter="(v) => v"
    :y-formatter="minutesToTime"
    x-type="linear"
    @point-click="onPointClick"
  />

  <ScatterBubbles
    v-if="grafSelecionado === 'todos' || grafSelecionado === 'ingestivo'"
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

const props = defineProps({
    // Agora a prop 'pontos' é a única fonte de dados para os gráficos.
    pontos: { type: Object, required: true },
    grafSelecionado: { type: String, required: true },
    highlightId: { type: [String, Number], default: null },
    minutesToTime: { type: Function, required: true },
    formatDate: { type: Function, required: true },
})
const emit = defineEmits(['point-click'])
const onPointClick = (p) => emit('point-click', p)


// Toda a lógica de fetch (onMounted, fetchComportamento, dadosApi, etc.) foi removida.
// O componente agora é "burro" e apenas renderiza os dados recebidos via props.
// Isso corrige o problema e torna o componente reutilizável e reativo às mudanças do pai.
</script>
