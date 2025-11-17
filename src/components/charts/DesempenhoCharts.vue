<template>
    <ScatterBubbles v-if="grafSelecionado === 'todos' || grafSelecionado === 'desempenho'" title="Evolução PV/Período"
        :pontos="pontosEvolucaoPVPeriodoTransformados" :chart-type="dynamicChartType" x-label="Data"
        y-label="Peso vivo (kg)" color="#16a34a" :highlight-id="highlightId" :x-formatter="formatDate"
        :y-formatter="(v) => v" x-type="time"
        @point-click="(p) => emitPointClick(p, 'Evolução PV/Período', 'Peso vivo (kg)')" />

    <ScatterBubbles
        v-if="grafSelecionado === 'animal' || grafSelecionado === 'desempenho' || grafSelecionado === 'todos'"
        title="Evolução PV/Dia" :pontos="pontosEvolucaoPesoTransformados" :chart-type="dynamicChartType" x-label="Data"
        y-label="Peso Vivo (kg)" color="#16a34a" :highlight-id="highlightId" :x-formatter="formatDate"
        :y-formatter="(v) => v" x-type="time"
        @point-click="(p) => emitPointClick(p, 'Evolução PV/Dia', 'Peso Vivo (kg)')" />

    <ScatterBubbles v-if="grafSelecionado === 'animal' || grafSelecionado === 'todos'" title="Evolução do GMD"
        :pontos="pontosGMDTransformados" x-label="Data" :chart-type="dynamicChartType" y-label="GMD (atual)"
        color="#16a34a" :highlight-id="highlightId" :x-formatter="formatDate" :y-formatter="formatKg" x-type="time"
        @point-click="(p) => emitPointClick(p, 'Evolução do GMD', 'GMD (kg)')" />

    <ScatterBubbles
        v-if="grafSelecionado === 'animal' || grafSelecionado === 'desempenho' || grafSelecionado === 'todos'"
        title="Evolução do Ganho" :pontos="pontosGanhoTransformados" :chart-type="dynamicChartType" x-label="Data"
        y-label="GMD (atual)" color="#16a34a" :highlight-id="highlightId" :x-formatter="formatDate"
        :y-formatter="formatKg" x-type="time"
        @point-click="(p) => emitPointClick(p, 'Evolução do Ganho', 'GMD (kg)')" />

    <ScatterBubbles v-if="grafSelecionado === 'animal' || grafSelecionado === 'todos'" title="Evolução Consumo Diário"
        :pontos="pontosEvolucaoConsumoTransformados" :chart-type="dynamicChartType" x-label="Data"
        y-label="Consumo (kg)" color="#00BCD4" :highlight-id="highlightId" :x-formatter="formatDate"
        :y-formatter="formatKg" x-type="time"
        @point-click="(p) => emitPointClick(p, 'Evolução Consumo Diário', 'Consumo (kg)')" />

</template>

<script setup>
/* global defineProps, defineEmits */
import { computed } from 'vue'; // <--- ÚNICA IMPORTAÇÃO NECESSÁRIA
import ScatterBubbles from '@/components/ScatterBubbles.vue'
import 'chartjs-adapter-date-fns';

// 1. REMOVA as props 'tipoAlvo' e 'idAlvo'.
const props = defineProps({
    // A prop 'pontos' é o objeto 'fonte' do ReportPage, 
    // que JÁ CONTÉM os dados agregados.
    modo: { type: String, required: true },
    // animalId: { type: String, required: true },
    pontos: { type: Object, required: true },
    grafSelecionado: { type: String, required: true },
    highlightId: { type: [String, Number], default: null },
    formatDate: { type: Function, required: true },
    formatKg: { type: Function, required: true },
});
const emit = defineEmits(['point-click']);

const emitPointClick = (ponto, title, yUnit) => {
    emit('point-click', {
        ...ponto,
        title: title,
        y_unit: yUnit,
    });
};

// --- Lógica de Gráfico Dinâmico ---
// Decide qual tipo de gráfico mostrar (Linha ou Bolinhas)
// ⬅️ CORREÇÃO: Lógica simplificada (não verifica mais 'animalId')
const dynamicChartType = computed(() => {
    return props.modo === 'animal' ? 'line' : 'scatter';
});

// 2. REMOVA as variáveis de estado local (dadosPesoBrutos, etc.)
// 3. REMOVA a função 'transformData' (Já foi feita no ReportPage)
// 4. REMOVA a função 'buscarDados' (O ReportPage faz isso)
// 5. REMOVA 'onMounted' e 'watch'

// 6. CORREÇÃO: Altere os 'computed' para ler DIRETAMENTE da prop 'pontos'.
//    Os dados (ex: EvolucaoPVDia) já são arrays de pontos prontos.
const pontosEvolucaoPesoTransformados = computed(() =>
    props.pontos.EvolucaoPVDia || [] // Acesso direto à prop!
);
const pontosGanhoTransformados = computed(() =>
    props.pontos.EvolucaoGanho || [] // Acesso direto à prop!
);
const pontosGMDTransformados = computed(() =>
    props.pontos.EvolucaoGMD || [] // Acesso direto à prop!
);
const pontosEvolucaoConsumoTransformados = computed(() =>
    props.pontos.EvolucaoConsumoDiario || [] // Acesso direto à prop!
);
const pontosEvolucaoPVPeriodoTransformados = computed(() =>
    props.pontos.EvolucaoPVPeriodo || [] // Acesso direto à prop!
);


</script>