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
    :pontos="pontosEvolucaoPesoTransformados"
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
    :pontos="pontosGMDTransformados"
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
    :pontos="pontosGanhoTransformados"
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
    v-if="grafSelecionado === 'animal' || grafSelecionado === 'todos'"
    title="Evolução Consumo Diário"
    :pontos="pontosEvolucaoConsumoTransformados" x-label="Data"
    y-label="Consumo (kg)"
    color="#00BCD4"
    :highlight-id="highlightId"
    :x-formatter="formatDate"
    :y-formatter="formatKg"
    x-type="time" 
    @point-click="onPointClick"
/>

</template>

<script setup>
/* global defineProps, defineEmits */
import { ref, computed, onMounted, watch } from 'vue'; 
import ScatterBubbles from '@/components/ScatterBubbles.vue'
import { getEvolucaoPeso, getEvolucaoConsumoDiario, getEvolucaoGanho, getEvolucaoGMD } from '@/api/desempenho.js';
import 'chartjs-adapter-date-fns';


const props = defineProps({
    // Props de Filtro (Usamos 'idAlvo' e 'tipoAlvo' para buscar, e 'pontos' como fallback)
    tipoAlvo: { type: String, required: true },
    idAlvo: { type: [String, Number], required: true },
    
    // Props de Controle e Formatação
    pontos: { type: Object, required: true }, // Objeto de fallback do ReportPage
    grafSelecionado: { type: String, required: true },
    highlightId: { type: [String, Number], default: null },
    formatDate: { type: Function, required: true },
    formatKg: { type: Function, required: true },
});
const emit = defineEmits(['point-click']);
const onPointClick = (p) => emit('point-click', p);

// Variáveis de estado para armazenar os dados brutos da API
const dadosPesoBrutos = ref(null);
const dadosGanhoBrutos = ref(null);
const dadosGMDBrutos = ref(null);
const dadosConsumoBrutos = ref(null);


// // Defina os parâmetros necessários para a rota
// const TIPO_ALVO = 'animal'; 
// const BRINCO_ALVO = 52;  // usar elas ali no onmouted

// Lógica de transformação de {data: valor} para {x: data, y: valor}
function transformData(dadosBrutos, idAlvo, tipoAlvo) {
    if (!dadosBrutos || typeof dadosBrutos !== 'object') return [];
    return Object.entries(dadosBrutos).map(([date, value]) => ({
        x: new Date(date), // Converte para objeto Date para x-type="time"
        y: value, 
        id: tipoAlvo === 'animal' ? idAlvo : null, // Marca o ID para highlight
    }));
}

// FUNÇÃO DE BUSCA UNIFICADA
async function buscarDados() {
    const { tipoAlvo, idAlvo } = props;

    // A maioria das rotas de Desempenho SÓ funciona para o modo 'animal'
    if (tipoAlvo !== 'animal' || !idAlvo) {
        dadosPesoBrutos.value = null;
        dadosGanhoBrutos.value = null;
        dadosGMDBrutos.value = null;
        return;
    }
    
    try {
        // Busca paralela dos indicadores de Desempenho (TODOS SÓ ACEITAM ID DO ANIMAL)
        const [peso, ganho, gmd,consumoDiario] = await Promise.all([
            getEvolucaoPeso(tipoAlvo, idAlvo),
            getEvolucaoGanho(tipoAlvo, idAlvo),
            getEvolucaoGMD(tipoAlvo, idAlvo),
            getEvolucaoConsumoDiario(tipoAlvo, idAlvo),
        ]);
        dadosConsumoBrutos.value = consumoDiario;
        
        dadosPesoBrutos.value = peso;
        dadosGanhoBrutos.value = ganho;
        dadosGMDBrutos.value = gmd;

    } catch (error) {
        console.error(`[API Erro - Desempenho] Falha ao buscar dados para ${idAlvo}.`, error);
        // Limpa os dados em caso de erro para que os gráficos fiquem vazios
        dadosPesoBrutos.value = null;
        dadosGanhoBrutos.value = null;
        dadosGMDBrutos.value = null;
    }
}

// COMPUTED PROPERTIES (Prepara os dados para o gráfico)
const pontosEvolucaoPesoTransformados = computed(() => 
    transformData(dadosPesoBrutos.value, props.idAlvo, props.tipoAlvo)
);
const pontosGanhoTransformados = computed(() => 
    transformData(dadosGanhoBrutos.value, props.idAlvo, props.tipoAlvo)
);
const pontosGMDTransformados = computed(() => 
    transformData(dadosGMDBrutos.value, props.idAlvo, props.tipoAlvo)
);

const pontosEvolucaoConsumoTransformados = computed(() => 
    transformData(dadosConsumoBrutos.value, props.idAlvo, props.tipoAlvo)
);


// Disparo inicial e reatividade
onMounted(buscarDados);
// Re-executa se o animalId mudar
watch(() => props.idAlvo, buscarDados); 
</script>