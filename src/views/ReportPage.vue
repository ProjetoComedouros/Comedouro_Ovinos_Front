<template>
  <div>
    <Navbar />
    <Sidebar />

    <div class="content">
      <h3 class="mb-4">Relatório</h3>
      <ReportHeader :selecionado="selecionado" />


      <section class="dash">
        <h5 class="mb-3">Análise gráfica</h5>




        <div class="toolbar">
          <div class="seg">
            <button :class="{ active: modo === 'animal' }" @click="modo = 'animal'">Animal</button>
            <button :class="{ active: modo === 'lote' }" @click="modo = 'lote'">Lote</button>
            <button :class="{ active: modo === 'geral' }" @click="modo = 'geral'">Geral</button>
          </div>



          <!-- Campo para ANIMAL -->
          <div v-if="modo === 'animal'" class="input-group">
            <div class="input-item">
              <label for="animalIdInput">ID do Animal:</label>
              <input id="animalIdInput" v-model.trim="animalId" placeholder="ex: 01"
                :class="{ 'erro': mensagemErro.includes('animal') }" style="width: 100px;" />
            </div>
            <div class="input-item">
              <label for="loteIdAnimalInput">Lote:</label>
              <input id="loteIdAnimalInput" v-model.trim="loteId" placeholder="ex: A"
                :class="{ 'erro': mensagemErro.includes('lote') }" style="width: 80px;" />
            </div>
          </div>

          <!-- Campo para LOTE -->
          <div v-if="modo === 'lote'" class="input-group">
            <label>
              ID do Lote:
              <input v-model.trim="loteId" placeholder="ex: A" @input="modo = 'lote'"
                :class="{ 'erro': mensagemErro.includes('lote') }" />
            </label>
          </div>

          <!-- Botões de tipo de gráfico -->
          <div class="seg">
            <span style="margin-right:8px;">Mostrar:</span>
            <button :class="{ active: grafSelecionado === 'todos' }" @click="grafSelecionado = 'todos'">Todos</button>
            <button :class="{ active: grafSelecionado === 'ingestivo' }" @click="grafSelecionado = 'ingestivo'">Comp.
              Ingestivo</button>
            <button :class="{ active: grafSelecionado === 'desempenho' }"
              @click="grafSelecionado = 'desempenho'">Desempenho</button>
            <button :class="{ active: grafSelecionado === 'viabilidade' }"
              @click="grafSelecionado = 'viabilidade'">Viabilidade</button>
          </div>
        </div>


        <div v-if="selecionadoPonto" class="info">
          <strong>Selecionado:</strong>
          ID {{ selecionadoPonto?.id }} | Lote {{ selecionadoPonto?.lote }} | x: {{ selecionadoPonto?.x }} | y: {{
            selecionadoPonto?.y }}
        </div>
        <p v-if="mensagemErro" class="text-red-600 font-bold mt-2">
          {{ mensagemErro }}
        </p>

        <div class="grid">



          <IngestivoCharts :pontos="fonte" :graf-selecionado="grafSelecionado" :highlight-id="highlightId"
            :minutes-to-time="minutesToTime" :format-date="formatDate" @point-click="onPointClick" />


          <DesempenhoCharts :pontos="fonte" :graf-selecionado="grafSelecionado" :highlight-id="highlightId"
            :format-date="formatDate" :format-kg="formatKg" @point-click="onPointClick" />

          <ViabilidadeCharts :pontos="fonte" :graf-selecionado="grafSelecionado" :highlight-id="highlightId"
            :format-date="formatDate" :format-kg="formatKg" :format-reais="formatReais" @point-click="onPointClick" />

        </div>
      </section>


      <h5 class="mt-4 mb-2">(esses dps aparecem somente ao clicar no animal no gráfico)</h5>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import Navbar from '@/components/ReportPage/ReportNavbar.vue'
import Sidebar from '@/components/ReportPage/ReportSidebar.vue'
import ReportHeader from '@/components/ReportPage/ReportHeader.vue'


import IngestivoCharts from '@/components/charts/IngestivoCharts.vue'
import DesempenhoCharts from '@/components/charts/DesempenhoCharts.vue'
import ViabilidadeCharts from '@/components/charts/ViabilidadeCharts.vue'

// =========================================================
// PASSO 1: Importar TODAS as funções da API
// =========================================================
import { animalGet } from '@/api/animais';
import { getConsumoDiario, getMinutoPorRefeicao } from '@/api/comportamentoIngestivo.js';
// import { getRefeicoesBrutas } from '@/api/comportamentoIngestivo.js';
// IMPORT FALTANTE: Função que busca dados brutos do endpoint /api/refeicoes/?animal={id}

// TODO: Crie os arquivos 'desempenho.js' e 'viabilidade.js' e importe as funções de lá
import { getEvolucaoPeso, getEvolucaoConsumoDiario, getEvolucaoGanho, getEvolucaoGMD } from '@/api/desempenho.js';
import { getCustoTotal, getEvolucaoCustoDiario, getGanhoPorDia } from '@/api/viabilidade.js';

// Funções do Componente Filho IngestivoCharts (que precisam ser passadas via props)
const selecionadoPonto = ref(null);
const onPointClick = (p) => { selecionadoPonto.value = p }



// =========================================================
// FUNÇÕES AUXILIARES DE CONVERSÃO (Obrigatórias para processar refeições)
// =========================================================

// Converte "HH:MM:SS" em minutos totais desde a meia-noite (necessário para plotar Horas)
const timeToMinutes = (timeString) => {
  if (!timeString) return 0;
  const [h, m, s] = timeString.split(':').map(Number);
  // Retorna minutos totais: 1 hora = 60 minutos
  return h * 60 + m + (s / 60 || 0);
};

// Calcula a duração da refeição em minutos
const calculateDuration = (entrada, saida) => {
  return timeToMinutes(saida) - timeToMinutes(entrada);
};


// ====== FUNÇÕES DE FORMATAÇÃO (MANTIDAS) ======
const minutesToTime = (mins) => {
  const h = String(Math.floor(mins / 60)).padStart(2, '0')
  const m = String(Math.round(mins % 60)).padStart(2, '0')
  return `${h}:${m}`
}

const formatDate = (date) => {
  if (typeof date === 'object' && date instanceof Date && !isNaN(date)) {
    // Trata o objeto Date que vem do transformData
    return date.toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' })
  }
  if (typeof date === 'string') {
    const d = new Date(date)
    if (isNaN(d)) return date
    return d.toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' })
  }
  return ''
}

const formatKg = (value) => `${value} kg`
const formatReais = (value) => {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

const selecionado = ref(false)

// ====== CONTROLES DE ESTADO (FILTROS) ======
const modo = ref('animal');
const animalId = ref('8');
const loteId = ref('');
const grafSelecionado = ref('todos');
const mensagemErro = ref('');

// Variáveis de Preço (Necessárias para a API de Viabilidade)
// eslint-disable-next-line no-unused-vars
const precoKgRacao = ref(0.50) // Será usado na API de Viabilidade
// eslint-disable-next-line no-unused-vars
const precoKgPesoVivo = ref(10.00) // Será usado na API de Viabilidade

// Estado para a requisição de dados
const dadosAPI = ref(null);
const animais = ref([]); // Estado para a lista de animais da tabela

import { onMounted } from 'vue'; // Import onMounted


const isLoading = ref(false);

// Objeto fonte de dados vazio (emptySource)
const emptySource = {
  ingestivo: [], desempenho: [], viabilidade: [], custo: [], evolucaocusto: [],
  EvolucaoPVPeriodo: [], EvolucaoPVDia: [], EvolucaoGMD: [], EvolucaoGanho: [],
  horaEntrada: [], horaSaida: [], minRefeicao: [], consumoDiario: [], ganhopordia: []
};

// =========================================================
// FUNÇÃO AUXILIAR: Transforma o formato { "data": valor } da API
// =========================================================
const transformData = (data, currentId, currentTipo) => {
  if (!data || typeof data !== 'object') return [];
  return Object.entries(data).map(([date, value]) => ({
    // Transforma a string 'YYYY-MM-DD' em um objeto Date para o x-type="time"
    x: new Date(date),
    y: value,
    id: currentTipo === 'animal' ? currentId : null,
    lote: currentTipo === 'lote' ? currentId : null,
  }));
};

// =========================================================
// FUNÇÃO PRINCIPAL: BUSCA DADOS NA API (AGORA COMPLETA)
// =========================================================
async function fetchData(tipo, id) {
  isLoading.value = true;
  mensagemErro.value = '';
  dadosAPI.value = null;

  try {
    // A busca da lista de animais foi movida para o onMounted para ser feita uma vez na inicialização.

    // 1. INGESTIVO: Requer 3 chamadas (2 agregadas + 1 bruta)
    const [consumo, minuto] = await Promise.all([
      getConsumoDiario(tipo, id),
      getMinutoPorRefeicao(tipo, id),

      // // Chamada CONDICIONAL para dados brutos, necessária apenas no modo 'animal' e se o ID for um número

    ]);
    const refeicoesBrutas = [];


    console.log('Dados de Consumo Recebidos:', consumo);
    // console.log('Refeições Brutas Recebidas:', refeicoesBrutas);

    // 2. DESEMPENHO (Comentado, mas a estrutura está correta)
    // 2. DESEMPENHO (Rotas corrigidas para seguir o README)
    const [evolucaoPeso, evolucaoConsumo, evolucaoGanho, evolucaoGMD] = await Promise.all([
      // [1] Evolução Peso: SÓ existe para ANIMAL (brinco)
      tipo === 'animal' ? getEvolucaoPeso(id) : Promise.resolve(null),

      // [2] Evolução Consumo: Existe para ambos (animal/lote)
      getEvolucaoConsumoDiario(tipo, id),

      // [3] Evolução Ganho: SÓ existe para ANIMAL (brinco)
      tipo === 'animal' ? getEvolucaoGanho(id) : Promise.resolve(null),

      // [4] Evolução GMD: SÓ existe para ANIMAL (brinco)
      tipo === 'animal' ? getEvolucaoGMD(id) : Promise.resolve([null]),
    ]);

    // 3. VIABILIDADE ECONÔMICA (Comentado, mas a estrutura está correta)
    // 3. VIABILIDADE ECONÔMICA (Rotas corrigidas para seguir o README)
    const [custoTotal, evolucaoCusto, ganhoPorDia] = await Promise.all([
      // [1] Custo Total: ACEITA APENAS UM PREÇO (Preço da Ração)
      getCustoTotal(tipo, id, precoKgRacao.value), // Removido o segundo preço

      // [2] Evolução Custo Diário: Aceita Preço da Ração
      getEvolucaoCustoDiario(tipo, id, precoKgRacao.value),

      // [3] Ganho por Dia: Aceita Preço do Peso Vivo
      getGanhoPorDia(tipo, id, precoKgPesoVivo.value),
    ]);

    // =========================================================
    // 4. PROCESSAMENTO DE DADOS BRUTOS (Hora Entrada/Saída/Ingestivo)
    // =========================================================
    const horaEntradaData = [];
    const horaSaidaData = [];
    const ingestivoData = []; // Duração da refeição

    if (tipo === 'animal' && Array.isArray(refeicoesBrutas) && refeicoesBrutas.length > 0) {
      refeicoesBrutas.forEach((refeicao, index) => {
        // X-axis: Índice (Contador de Refeição) para "Presença no comedouro"
        const xValue = index + 1;

        // Y-axis: Horário de entrada/saída em minutos
        const entradaMins = timeToMinutes(refeicao.horario_entrada);
        const saidaMins = timeToMinutes(refeicao.horario_saida);
        const duracaoMins = calculateDuration(refeicao.horario_entrada, refeicao.horario_saida);

        const pontoBase = { x: xValue, id: refeicao.id, lote: refeicao.lote_id || loteId.value };

        horaEntradaData.push({ ...pontoBase, y: entradaMins });
        horaSaidaData.push({ ...pontoBase, y: saidaMins });
        ingestivoData.push({ ...pontoBase, y: duracaoMins }); // Comportamento Ingestivo (Duração)
      });
    }


    // **5. Mapeamento e Transformação Final**
    dadosAPI.value = {
      // Começa com todas as chaves garantidas e vazias
      ...emptySource,

      // INGESTIVO
      // Agora, sobrescreve as chaves com os dados reais que foram buscados
      consumoDiario: transformData(consumo, id, tipo),
      minRefeicao: transformData(minuto, id, tipo),
      horaEntrada: horaEntradaData,
      horaSaida: horaSaidaData,
      ingestivo: ingestivoData,
      // ... adicione aqui os dados de Desempenho e Viabilidade quando forem implementados

      // === ADIÇÃO NECESSÁRIA PARA DESEMPENHO ===
      // Assumindo que você quer passar os dados brutos e que o transformData funciona
      // (Ainda é um objeto { "data": valor } que o transformData consegue mapear)
      EvolucaoPVDia: transformData(evolucaoPeso, id, tipo), // Mapeia a evolução do peso
      EvolucaoConsumoDiario: transformData(evolucaoConsumo, id, tipo), // Mapeia a evolução do consumo
      EvolucaoGanho: transformData(evolucaoGanho, id, tipo), // Mapeia a evolução do ganho
      EvolucaoGMD: transformData(evolucaoGMD, id, tipo), // Mapeia o GMD

      // === ADIÇÃO NECESSÁRIA PARA VIABILIDADE ===
      // Estes podem ser valores únicos ou séries temporais, use o transformData se forem séries.
      custoTotal: custoTotal.custo_total || 0, // Assume que custoTotal retorna { custo_total: X }
      evolucaoCusto: transformData(evolucaoCusto, id, tipo),
      ganhopordia: transformData(ganhoPorDia, id, tipo),

      // NOTA: Ajuste as chaves (ex: EvolucaoPVDia) para o que os componentes filhos esperam.
    };


  } catch (error) {
    const status = error.response ? error.response.status : '';
    let errorMessage = `⚠️ Falha ao carregar dados (${tipo} ${id}). Status: ${status || 'Rede/API'}.`;

    // Tenta extrair a mensagem de erro específica do servidor (Ex: "Não foram encontrados animais...")
    const serverError = error.response?.data?.erro;

    if (serverError) {
      // Se o servidor enviou uma mensagem clara, usamos ela.
      mensagemErro.value = `⚠️ Erro do Servidor: ${serverError}`;
    } else {
      // Caso contrário (erro de rede, ou 404 sem corpo), usamos a mensagem genérica.
      mensagemErro.value = errorMessage;
    }

    // Limpeza de estado (correto)
    dadosAPI.value = null;
    animais.value = [];

    // Log completo para o desenvolvedor (correto)
    console.error(`Erro no fetch (${tipo} ${id}):`, error);
  } finally {
    isLoading.value = false;
  }
}

// =========================================================
// BUSCA INICIAL: Popula a lista de animais uma vez ao montar o componente
// =========================================================
onMounted(async () => {
  // Esta chamada é para popular a lista geral de animais (ex: para um dropdown).
  // Se animalGet(8) deve retornar uma lista de animais, então está correto.
  // Se animalGet(8) retorna um único animal, e 'animais' é para uma lista,
  // você pode precisar ajustar a chamada (ex: animalGet() para todos, ou [await animalGet(8)]).
  animais.value = await animalGet(8);
});

// =========================================================
// WATCHER: Dispara a requisição ao mudar os filtros
// =========================================================

watch([modo, animalId, loteId, precoKgRacao, precoKgPesoVivo], ([newModo]) => {
  selecionadoPonto.value = null;
  mensagemErro.value = '';

  // Lógica de UX: Limpa os inputs ao mudar de modo para evitar confusão
  if (newModo === 'geral' && (animalId.value || loteId.value)) {
    animalId.value = '';
    loteId.value = '';
    // A limpeza dos IDs vai disparar o watch novamente, então retornamos para evitar uma chamada dupla.
    // Na próxima execução, os IDs estarão limpos e a chamada para 'geral' será feita.
    return;
  }

  if (newModo === 'geral') {
    // NOVO COMPORTAMENTO: Se não há nada predefinido, mostra a instrução de busca.
    dadosAPI.value = null;
    mensagemErro.value = 'Selecione o modo "Animal" ou "Lote" e digite um ID para começar.';
  }

  else if (newModo === 'lote') {
    if (loteId.value) {
      fetchData('lote', loteId.value);
    } else {
      mensagemErro.value = 'Digite o ID do Lote para buscar.';
      dadosAPI.value = null;
    }
  }

  else if (newModo === 'animal') {
    if (animalId.value) {
      // Busca o animal 8 (ou qualquer valor digitado)
      fetchData('animal', animalId.value);
    } else {
      mensagemErro.value = 'Digite o ID do Animal para buscar.';
      dadosAPI.value = null;
    }
  }
}, { immediate: true });


const fonte = computed(() => {
  // Retorna a fonte vazia se estiver carregando ou com erro
  if (isLoading.value || !dadosAPI.value) {
    return emptySource;
  }
  return dadosAPI.value;
});

// ====== SELEÇÃO DE PONTO E DESTAQUE (MANTIDOS) ======
const highlightId = computed(() => {
  if (selecionadoPonto.value) {
    return selecionadoPonto.value.id;
  }
  if (modo.value === 'animal' && animalId.value) {
    return animalId.value;
  }
  return null;
});
</script>

<style scoped>
:root {
  --verde-nata: #198754;
  --fundo-claro: #f8f9fa;
  --texto-cinza: #444;
}

body {
  font-family: 'Segoe UI', sans-serif;
}

.content {
  margin-left: 220px;
  padding: 2rem;
  margin-top: 56px;
}

/* seção nova */
.dash {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 14px 16px
}

.toolbar {
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 12px;
  background: #fafafa;
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 10px 12px
}

.seg {
  display: flex;
  gap: 8px;
  align-items: center;
  background: #f3f4f6;
  padding: 6px;
  border-radius: 10px
}

.seg button {
  border: none;
  background: transparent;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600
}

.seg button.active {
  background: #111;
  color: #fff
}

input {
  padding: 8px 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.input-group {
  display: flex;
  gap: 16px;
  align-items: center;
}

.input-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
}

.input-item label {
  font-size: 0.9rem;
  color: #555;
}

input.erro {
  border-color: #ef4444;
  background-color: #fee2e2;
}


.grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px
}

@media (max-width:1200px) {
  .grid {
    grid-template-columns: 1fr
  }
}

.info {
  margin: 8px 0 14px;
  padding: 8px 12px;
  border-left: 4px solid #2563eb;
  background: #eef2ff;
  border-radius: 8px
}

/* tabela (seu estilo original) */
.table-placeholder {
  background-color: #ffffff;
  border: 1px solid #dee2e6;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
}
</style>