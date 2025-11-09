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
    @point-click="(p) => emitPointClick(p, 'Comportamento Ingestivo', 'Horas')"
  />

  <ScatterBubbles
    v-if="grafSelecionado === 'animal' || grafSelecionado === 'ingestivo'"
    title="Hora Entrada"
    :pontos="pontos.horaEntrada"
    x-label="Presença no comedouro"
    y-label="Horas"
    color="orange"
    :highlight-id="highlightId"
    :x-formatter="(v) => v"
    :y-formatter="minutesToTime"
    x-type="linear"
    @point-click="(p) => emitPointClick(p, 'Hora Entrada', 'Horas')"
  />

  <ScatterBubbles
    v-if="grafSelecionado === 'animal' || grafSelecionado === 'todos'"
    title="Hora Entrada (Linha)"
    :pontos="pontos.horaEntrada"
    x-label="Presença no comedouro"
    y-label="Horas"
    color="orange"
    :highlight-id="highlightId"
    x-type="linear"
    :x-formatter="(v) => v"
    :y-formatter="minutesToTime"
    chart-type="line"
    @point-click="(p) => emitPointClick(p, 'Hora Entrada', 'Horas')"
  />

  <ScatterBubbles
    v-if="grafSelecionado === 'todos' || grafSelecionado === 'horaSaida'"
    title="Hora Saída"
    :pontos="pontos.horaSaida"
    x-label="Presença no comedouro"
    y-label="Horas"
    color="green"
    :highlight-id="highlightId"
    :x-formatter="(v) => v"
    :y-formatter="minutesToTime"
    x-type="linear"
    @point-click="(p) => emitPointClick(p, 'Hora Saída', 'Horas')"
  />

  <ScatterBubbles
    v-if="grafSelecionado === 'animal' || grafSelecionado === 'ingestivo' || grafSelecionado === 'todos' || grafSelecionado === 'minRefeicao'"
    title="Min/Refeição (API)"
    :pontos="pontos.minRefeicao" 
    x-label="Data" 
    y-label="Minutos"
    color="blue"
    :highlight-id="highlightId"
    :x-formatter="formatDate" 
    :y-formatter="minutesToTime"
    x-type="time" 
    @point-click="(p) => emitPointClick(p, 'Min/Refeição (API)', 'Minutos')"
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
    @point-click="(p) => emitPointClick(p, 'Consumo Diário', 'Kg')"
  />
</template>

<script setup>
/* global defineProps, defineEmits */
// 1. Importa onMounted, ref e **computed**
// import { onMounted, ref, computed } from 'vue'; 
import ScatterBubbles from '@/components/ScatterBubbles.vue'
import 'chartjs-adapter-date-fns';

// // Importa a função de serviço
// import { getMinutoPorRefeicao } from '@/api/comportamentoIngestivo.js'; 

// Props e Emits (mantidas)
defineProps({
  pontos: { type: Object, required: true },
  grafSelecionado: { type: String, required: true },
  highlightId: { type: [String, Number], default: null },
  
  minutesToTime: { type: Function, required: true },
  formatDate: { type: Function, required: true },
})

const emit = defineEmits(['point-click'])
// const onPointClick = (p) => emit('point-click', p)



// Função auxiliar para injetar o título e a label no ponto antes de emitir
const emitPointClick = (ponto, title, yUnit) => {
    emit('point-click', {
        ...ponto,
        title: title,
        y_unit: yUnit 
    });
};

// // Variável reativa para armazenar os DADOS BRUTOS da API
// const dadosMinutoPorRefeicaoBrutos = ref(null);

// // Defina os parâmetros necessários para a rota
// const TIPO_ALVO = 'animal'; 
// const BRINCO_ALVO = 52; 

// // *******************************************************************
// // 1. FUNÇÃO DE TRANSFORMAÇÃO
// // *******************************************************************
// function transformarDadosGrafico(dadosBrutos) {
//     if (!dadosBrutos || typeof dadosBrutos !== 'object') {
//         return [];
//     }
    
//     // Mapeia o objeto (chave: data, valor: minuto) para um array de objetos {x: data, y: valor}
//     return Object.entries(dadosBrutos).map(([data, valor]) => ({
//         // Eixo X: Data
//         x: data, 
//         // Eixo Y: Valor (minutos)
//         y: valor, 
//         // Id para highlight (opcional, mas útil)
//         id: BRINCO_ALVO, 
//     }));
// }


// // *******************************************************************
// // 2. COMPUTED PROPERTY para dados prontos para o gráfico
// // *******************************************************************
// const pontosMinRefeicaoTransformados = computed(() => {
//     // Se a API ainda não retornou ou deu erro, retorna um array vazio.
//     if (!dadosMinutoPorRefeicaoBrutos.value) {
//         return [];
//     }
//     // Transforma os dados brutos
//     return transformarDadosGrafico(dadosMinutoPorRefeicaoBrutos.value);
// });


// // *******************************************************************
// // 3. Hook onMounted
// // *******************************************************************
// onMounted(async () => {
//     console.log(`[API Call] Iniciando requisição para ${TIPO_ALVO}/${BRINCO_ALVO}/`);
    
//     try {
//         const dados = await getMinutoPorRefeicao(TIPO_ALVO, BRINCO_ALVO);
        
//         console.log(`[API Sucesso] Dados Brutos:`, dados);
        
//         // Armazena os DADOS BRUTOS na variável reativa
//         dadosMinutoPorRefeicaoBrutos.value = dados; 
        
//     } catch (error) {
//         console.error("[API Erro] Falha ao buscar Minuto Por Refeição.", error.response || error);
//     }
// });
</script>

