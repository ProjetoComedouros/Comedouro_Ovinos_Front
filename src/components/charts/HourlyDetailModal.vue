<template>
    <!-- O Fundo Escuro (Overlay) -->
    <div class="modal-overlay" @click.self="$emit('close')">

        <!-- O Card de Conteúdo -->
        <div class="modal-card">
            <div class="modal-header">
                <h5 class="chart-title">Consumo por Hora: Animal {{ animalId }}</h5>
                <p class="chart-subtitle">{{ formatarDataModal(dataSelecionada) }}</p>
                <button class="close-button" @click="$emit('close')">×</button>
            </div>

            <!-- O Gráfico de Barras por Hora -->
            <div class="canvas-wrap">
                <canvas ref="hourlyCanvasRef"></canvas>
            </div>

        </div>
    </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, watch, defineProps, defineEmits } from 'vue';
import { Chart } from 'chart.js/auto';

// --- Props e Emits ---
const props = defineProps({
    data: { type: Object, required: true }, // Objeto (ex: {"12:58:00": 304.5})
    animalId: { type: [String, Number], required: true },
    dataSelecionada: { type: Date, required: true }
});
defineEmits(['close']);

const hourlyCanvasRef = ref(null);
let hourlyChart;

// --- Funções Auxiliares ---
const formatarDataModal = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('pt-BR', { timeZone: 'UTC', dateStyle: 'full' });
};


function transformData(dadosBrutos) {
    if (!dadosBrutos || typeof dadosBrutos !== 'object') return [];

   
    const hourlyBuckets = {}; // ex: { 18: 1042.516, 19: 393.648 }

    for (const [hora, valor] of Object.entries(dadosBrutos)) {
        const hourKey = parseInt(hora.split(':')[0], 10); // Extrai a hora (ex: 18)
        if (!isNaN(hourKey)) {
            if (!hourlyBuckets[hourKey]) {
                hourlyBuckets[hourKey] = 0;
            }
            hourlyBuckets[hourKey] += valor;
        }
    }

    // 2. Converte para o formato do Chart.js, ordenando por hora
    return Object.entries(hourlyBuckets)
        .map(([hour, totalValue]) => ({
            x: `${String(hour).padStart(2, '0')}:00`, // Label do eixo X: "18:00"
            y: totalValue,
        }))
        .sort((a, b) => a.x.localeCompare(b.x)); // Garante a ordem cronológica
}


// --- Lógica do Gráfico ---
const buildChart = () => {
    if (hourlyChart) hourlyChart.destroy();
    if (!hourlyCanvasRef.value) return;

    // Prepara os dados para o Chart.js
    const pontos = transformData(props.data);

    hourlyChart = new Chart(hourlyCanvasRef.value, {
        type: 'bar', // ⬅️ MUDANÇA: Gráfico de Barras
        data: {
            datasets: [
                {
                    label: 'Consumo (g)',
                    data: pontos, // Array [{x, y}]
                    backgroundColor: '#0d6efd',
                    yAxisID: 'y-consumo',
                    barPercentage: 0.7,
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { 
                    type: 'category', 
                    title: { display: true, text: 'Hora do Dia ' },
                },
                'y-consumo': {
                    type: 'linear',
                    position: 'left',
                    title: { display: true, text: 'Consumo (g)' },
                    min: 0,
                }
            },
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        font: {
                            weight: 'normal' // Remove o negrito da legenda
                        }
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: (context) => {
                            const label = context.dataset.label || '';
                            const yValue = context.raw.y;
                            
                            return `${label}: ${yValue.toFixed(2)} g`;
                        }
                    }
                }
            }
        }
    });
};

onMounted(buildChart);
watch(() => props.data, buildChart); 
onBeforeUnmount(() => {
    if (hourlyChart) hourlyChart.destroy();
});
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
}

.modal-card {
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    width: 90%;
    max-width: 800px;
    height: 80%;
    max-height: 600px;
    padding: 20px;
    display: flex;
    flex-direction: column;
}

.modal-header {
    position: relative;
    text-align: center;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
}

.chart-title {
    font-size: 1.25rem;
    font-weight: normal;
    color: #333;
    margin: 0;
}

.chart-subtitle {
    font-size: 1rem;
    color: #555;
    margin: 0;
}

.close-button {
    position: absolute;
    top: -10px;
    right: 0px;
    background: #f1f1f1;
    border: none;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    font-size: 1.2rem;
    font-weight: 600;
    color: #888;
    cursor: pointer;
    line-height: 30px;
}

.close-button:hover {
    background: #e0e0e0;
    color: #111;
}

.canvas-wrap {
    position: relative;
    height: 50%;
    flex-grow: 1;
    margin-top: 15px;
}
</style>